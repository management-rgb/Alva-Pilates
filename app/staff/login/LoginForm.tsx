"use client";

import { useActionState } from "react";
import { staffLogin } from "./actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(staffLogin, undefined);
  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-2 text-sm font-medium text-[#2f2e2b]">
        Passcode
        <input
          type="password"
          name="passcode"
          required
          autoFocus
          autoComplete="current-password"
          className="h-12 rounded-xl border border-[#d8cfc4] bg-white px-4 text-base text-[#2f2e2b] outline-none focus:border-[#2f2e2b] focus-visible:ring-2 focus-visible:ring-[#CFC2B0]"
        />
      </label>
      {state?.error ? (
        <p role="alert" className="text-sm text-[#8a3b2e]">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-xl bg-[#2f2e2b] text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#3a3936] disabled:opacity-60"
      >
        {pending ? "Checking…" : "Open handbook"}
      </button>
    </form>
  );
}
