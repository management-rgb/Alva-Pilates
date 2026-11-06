/**
 * Staff-area session auth (no dependencies, Edge + Node safe via Web Crypto).
 *
 * Staff sign in with a shared passcode (STAFF_GUIDE_PASSCODE). A successful
 * sign-in sets an HttpOnly cookie holding an HMAC-signed expiry. The signature
 * key is STAFF_GUIDE_SECRET (recommended) or, if unset, the passcode itself —
 * so changing either one signs everyone out.
 *
 * Fails closed: with no passcode configured, nobody can sign in.
 */

export const STAFF_COOKIE = "alva_staff_session";
export const STAFF_SESSION_SECONDS = 60 * 60 * 12; // 12 hours — one shift
export const STAFF_HOME = "/staff";
export const STAFF_LOGIN = "/staff/login";

const enc = new TextEncoder();

function getPasscode(): string | null {
  const value = process.env.STAFF_GUIDE_PASSCODE?.trim();
  return value ? value : null;
}

function getKeyMaterial(): string | null {
  const passcode = getPasscode();
  if (!passcode) return null;
  return process.env.STAFF_GUIDE_SECRET?.trim() || passcode;
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(message: string, keyMaterial: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(keyMaterial),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}

/** Constant-time string comparison (both sides are hashed to equal length first). */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export function staffAuthConfigured(): boolean {
  return getPasscode() !== null;
}

export async function checkPasscode(input: string): Promise<boolean> {
  const passcode = getPasscode();
  if (!passcode) return false;
  return safeEqual(input.trim(), passcode);
}

export async function createSessionToken(): Promise<string | null> {
  const keyMaterial = getKeyMaterial();
  if (!keyMaterial) return null;
  const expires = Date.now() + STAFF_SESSION_SECONDS * 1000;
  const nonce = toHex(crypto.getRandomValues(new Uint8Array(8)).buffer as ArrayBuffer);
  const payload = `${expires}.${nonce}`;
  return `${payload}.${await hmac(payload, keyMaterial)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const keyMaterial = getKeyMaterial();
  if (!token || !keyMaterial) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, sig] = parts;
  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  return safeEqual(sig, await hmac(`${expires}.${nonce}`, keyMaterial));
}

/** Only allow post-login redirects that stay inside the staff area. */
export function safeStaffNext(next: string | null | undefined): string {
  if (next && /^\/staff\/[a-z0-9\-/]*$/i.test(next) && !next.startsWith(STAFF_LOGIN)) {
    return next;
  }
  return STAFF_HOME;
}
