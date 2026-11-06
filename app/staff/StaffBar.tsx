import Link from "next/link";
import { staffLogout } from "./login/actions";
import { staffPages } from "./staffPages";

/** Shared top bar for staff pages: tap to move between pages, or sign out. */
export default function StaffBar({ current }: { current?: string }) {
  const link =
    "inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2e2b]";
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(47,46,43,0.14)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <Link href="/staff" className="shrink-0 text-sm font-semibold tracking-[0.2em] text-[#2f2e2b]">
          ALVA <span className="hidden font-normal tracking-normal text-[#625f58] sm:inline">· Staff</span>
        </Link>
        <nav aria-label="Staff pages" className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
          <ul className="flex gap-1.5">
            {staffPages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={current === p.href ? "page" : undefined}
                  className={`${link} ${
                    current === p.href
                      ? "bg-[#2f2e2b] font-semibold text-white"
                      : "text-[#2f2e2b] hover:bg-[#D8CFC4]"
                  }`}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <form action={staffLogout} className="shrink-0">
          <button
            type="submit"
            className="h-10 rounded-full border border-[rgba(47,46,43,0.14)] px-4 text-xs font-semibold text-[#2f2e2b] hover:bg-[#D8CFC4]"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
