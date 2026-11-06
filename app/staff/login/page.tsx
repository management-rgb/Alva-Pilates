import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STAFF_COOKIE, safeStaffNext, verifySessionToken } from "../../lib/staffAuth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const target = safeStaffNext(next);
  if (await verifySessionToken((await cookies()).get(STAFF_COOKIE)?.value)) redirect(target);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#FAF8F4] px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#8a7d6b]">
          Alva Pilates
        </p>
        <h1
          className="mt-3 text-center text-4xl text-[#2f2e2b]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Staff sign-in
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-[#6d6c68]">
          Enter the team passcode to open the staff handbook.
        </p>
        <LoginForm next={target} />
      </div>
    </main>
  );
}
