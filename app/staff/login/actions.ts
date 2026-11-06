"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  STAFF_COOKIE,
  STAFF_LOGIN,
  STAFF_SESSION_SECONDS,
  checkPasscode,
  createSessionToken,
  safeStaffNext,
  staffAuthConfigured,
} from "../../lib/staffAuth";

export type LoginState = { error?: string } | undefined;

/** Best-effort throttle (per server instance): 5 misses per 10 minutes per IP. */
const misses = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_MISSES = 5;

export async function staffLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!staffAuthConfigured()) {
    return { error: "Staff sign-in isn't set up yet. Ask the studio owner." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const record = misses.get(ip);
  if (record && now - record.first > WINDOW_MS) misses.delete(ip);
  const current = misses.get(ip);
  if (current && current.count >= MAX_MISSES) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const passcode = String(formData.get("passcode") ?? "");
  const ok = passcode.length > 0 && passcode.length < 200 && (await checkPasscode(passcode));

  if (!ok) {
    misses.set(ip, { count: (current?.count ?? 0) + 1, first: current?.first ?? now });
    await new Promise((r) => setTimeout(r, 800));
    return { error: "That passcode isn't right. Please try again." };
  }

  misses.delete(ip);
  const token = await createSessionToken();
  if (!token) return { error: "Staff sign-in isn't set up yet. Ask the studio owner." };

  (await cookies()).set(STAFF_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: STAFF_SESSION_SECONDS,
  });
  redirect(safeStaffNext(String(formData.get("next") ?? "")));
}

export async function staffLogout() {
  (await cookies()).delete(STAFF_COOKIE);
  redirect(STAFF_LOGIN);
}
