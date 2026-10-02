"use client";

import { useEffect, useRef, useState } from "react";
import { createTestCheckoutSession, type TestCheckoutSession } from "@/lib/stubs";
import { formatUsd } from "@/lib/workflows";

export function StripeTestCheckout({
  open,
  onClose,
  monthly,
  annual,
  summary,
}: {
  open: boolean;
  onClose: () => void;
  monthly: number;
  annual: number;
  summary: string;
}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<TestCheckoutSession | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const total = billing === "monthly" ? monthly : annual;

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSession(await createTestCheckoutSession(total));
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/70 p-4 sm:items-center" role="presentation">
      <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="checkout-title" className="font-heading text-xl font-bold">
              Checkout
            </h2>
            <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              Stripe test mode: no real charge
            </span>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-sm text-muted hover:bg-slate-100">
            Close
          </button>
        </div>

        {session ? (
          <div className="mt-6" role="status">
            <p className="font-heading text-lg font-semibold text-emerald-700">Your agentic environment is live.</p>
            <p className="mt-2 text-sm text-muted">
              Test session <code className="rounded bg-slate-100 px-1.5 py-0.5">{session.id}</code> created for{" "}
              {formatUsd(session.amountMonthly)} ({billing}). This is a front-end stub: no tenant was provisioned.
            </p>
            <button type="button" onClick={onClose} className="mt-5 w-full rounded-lg bg-brand py-2.5 font-semibold text-white hover:bg-brand-dark">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={pay} className="mt-5 space-y-4">
            <p className="text-sm text-muted">{summary}</p>
            <fieldset>
              <legend className="text-sm font-medium">Billing</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["monthly", "annual"] as const).map((b) => (
                  <label
                    key={b}
                    className={`cursor-pointer rounded-lg border p-3 text-sm ${billing === b ? "border-brand bg-brand/5" : "border-slate-300"}`}
                  >
                    <input type="radio" name="billing" value={b} checked={billing === b} onChange={() => setBilling(b)} className="sr-only" />
                    <span className="block font-semibold capitalize">{b}</span>
                    <span className="text-muted">{formatUsd(b === "monthly" ? monthly : annual)}{b === "monthly" ? "/mo" : "/yr (20% off)"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="co-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="co-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="co-card" className="text-sm font-medium">
                Card (test)
              </label>
              <input
                id="co-card"
                readOnly
                value="4242 4242 4242 4242"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-600"
              />
              <p className="mt-1 text-xs text-muted">Stripe test card prefilled. No card data is collected.</p>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {busy ? "Creating test session…" : `Pay ${formatUsd(total)} (test)`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
