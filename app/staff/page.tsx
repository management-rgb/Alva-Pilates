import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STAFF_COOKIE, STAFF_LOGIN, verifySessionToken } from "../lib/staffAuth";
import StaffBar from "./StaffBar";
import { staffPages } from "./staffPages";

export const dynamic = "force-dynamic";

export default async function StaffHome() {
  if (!(await verifySessionToken((await cookies()).get(STAFF_COOKIE)?.value))) redirect(STAFF_LOGIN);

  return (
    <div className="min-h-dvh bg-[#FAF8F4] text-[#2f2e2b]">
      <StaffBar current="/staff" />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#625f58]">Alva Pilates</p>
        <h1
          className="mt-2 text-[clamp(2.4rem,6vw,3.6rem)] leading-[1.05]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Staff home
        </h1>
        <p className="mt-3 text-base text-[#625f58]">Tap a page to open it.</p>
        <ul className="mt-8 grid gap-3">
          {staffPages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="flex min-h-20 flex-col justify-center rounded-2xl border border-[rgba(47,46,43,0.14)] bg-white px-5 py-4 transition-colors hover:bg-[#D8CFC4]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2e2b]"
              >
                <span className="text-lg font-semibold">{p.label}</span>
                <span className="mt-0.5 text-sm text-[#625f58]">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
