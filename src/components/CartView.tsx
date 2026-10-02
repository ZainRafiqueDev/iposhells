"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { StripeTestCheckout } from "./StripeTestCheckout";
import {
  ANNUAL_DISCOUNT,
  GOVERNANCE_ADDON,
  INTEGRATION_ADDON,
  calculatePricing,
  formatUsd,
  getWorkflow,
  type Governance,
  type IntegrationKey,
} from "@/lib/workflows";
import { AUDIT_PATH } from "@/lib/site";

const INTEGRATION_LABELS: Record<IntegrationKey, string> = {
  CRM: "CRM (Salesforce / HubSpot)",
  Slack: "Slack",
  Workspace: "Google Workspace",
  APIs: "Custom APIs",
};

export function CartView() {
  const { ids, governance, integrations, hydrated, remove, clear, setGovernance, toggleIntegration, add } = useCart();
  const [checkout, setCheckout] = useState(false);

  const items = ids.map(getWorkflow).filter((w): w is NonNullable<typeof w> => !!w);
  const pricing = calculatePricing({ workflowIds: ids, governance, integrations });
  const hours = items.reduce((s, w) => s + w.hoursSavedPerMonth, 0);
  const fte = items.reduce((s, w) => s + w.fteReplaced, 0);

  if (!hydrated) return <p className="text-muted">Loading cart…</p>;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center">
        <p className="text-lg font-semibold">Your cart is empty.</p>
        <p className="mt-2 text-muted">Pick workflows from the marketplace, or load a sample cart to try the flow.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/#marketplace" className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
            Browse the Workflow Marketplace
          </Link>
          <button
            type="button"
            onClick={() => ["outbound-engine", "multi-system-sync"].forEach(add)}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold hover:border-brand"
          >
            Load sample cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
            {items.map((w) => (
              <li key={w.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{w.name}</p>
                  <p className="text-sm text-muted">
                    {w.category} · ~{w.hoursSavedPerMonth} hrs saved/mo · {w.fteReplaced} FTE
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-brand">{formatUsd(w.basePrice)}/mo</span>
                  <button
                    type="button"
                    onClick={() => remove(w.id)}
                    aria-label={`Remove ${w.name}`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:border-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <fieldset className="rounded-2xl border border-line bg-white p-5">
            <legend className="px-2 font-heading font-semibold">Governance package</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(["Standard", "Advanced"] as Governance[]).map((g) => (
                <label
                  key={g}
                  className={`cursor-pointer rounded-lg border p-4 ${governance === g ? "border-brand bg-brand/5" : "border-slate-300"}`}
                >
                  <input
                    type="radio"
                    name="governance"
                    checked={governance === g}
                    onChange={() => setGovernance(g)}
                    className="mr-2 accent-brand"
                  />
                  <span className="font-semibold">{g}</span>
                  <span className="ml-2 text-sm text-muted">
                    {GOVERNANCE_ADDON[g] ? `+${formatUsd(GOVERNANCE_ADDON[g])}/mo` : "Included"}
                  </span>
                  <p className="mt-1 pl-6 text-xs text-muted">
                    {g === "Standard" ? "RBAC, encryption, audit logging." : "Adds extended retention and compliance policy controls."}
                  </p>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-line bg-white p-5">
            <legend className="px-2 font-heading font-semibold">Integration support</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(Object.keys(INTEGRATION_ADDON) as IntegrationKey[]).map((k) => (
                <label
                  key={k}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-4 ${
                    integrations.includes(k) ? "border-brand bg-brand/5" : "border-slate-300"
                  }`}
                >
                  <span>
                    <input
                      type="checkbox"
                      checked={integrations.includes(k)}
                      onChange={() => toggleIntegration(k)}
                      className="mr-2 accent-brand"
                    />
                    {INTEGRATION_LABELS[k]}
                  </span>
                  <span className="text-sm text-muted">+{formatUsd(INTEGRATION_ADDON[k])}/mo</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="h-fit rounded-2xl bg-navy p-6 text-white lg:sticky lg:top-24" aria-label="Order summary">
          <h2 className="font-heading text-lg font-semibold text-cyan">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Workflows" value={String(pricing.workflowCount)} />
            <Row label="Governance" value={governance} />
            <Row label="Integrations" value={integrations.length ? integrations.join(", ") : "None"} />
            <Row label="Est. hours saved" value={`${hours}/mo`} />
            <Row label="Est. FTE replaced" value={fte.toFixed(2)} />
          </dl>
          <div className="mt-5 border-t border-white/15 pt-5">
            <p className="text-sm text-slate-300">Monthly price</p>
            <p className="font-heading text-3xl font-bold">{formatUsd(pricing.monthly)}</p>
            <p className="mt-3 text-sm text-slate-300">Annual price ({ANNUAL_DISCOUNT * 100}% discount)</p>
            <p className="font-heading text-xl font-bold text-cyan">{formatUsd(pricing.annual)}/yr</p>
          </div>
          <Link
            href={AUDIT_PATH}
            className="mt-6 block rounded-lg bg-brand py-3 text-center text-sm font-semibold hover:bg-brand-dark"
          >
            Continue to Architecture Audit
          </Link>
          <button
            type="button"
            onClick={() => setCheckout(true)}
            className="mt-3 w-full rounded-lg border border-white/30 py-3 text-sm font-semibold hover:border-cyan hover:text-cyan"
          >
            Proceed to Checkout (test mode)
          </button>
          <button type="button" onClick={clear} className="mt-3 w-full text-xs text-slate-400 underline hover:text-white">
            Clear cart
          </button>
          <p className="mt-4 text-xs text-slate-400">Sample pricing. Volume multipliers are applied in the Architecture Audit.</p>
        </aside>
      </div>

      <StripeTestCheckout
        open={checkout}
        onClose={() => setCheckout(false)}
        monthly={pricing.monthly}
        annual={pricing.annual}
        summary={`${pricing.workflowCount} workflow(s), ${governance} governance.`}
      />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-300">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
