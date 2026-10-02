"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { CrmButtons } from "./CrmButtons";
import { StripeTestCheckout } from "./StripeTestCheckout";
import {
  VOLUME_MULTIPLIER,
  WORKFLOWS,
  calculatePricing,
  formatUsd,
  getWorkflow,
  type Governance,
  type IntegrationKey,
  type Volume,
} from "@/lib/workflows";

type Crm = "Salesforce" | "HubSpot" | "Other" | "";
type YesNo = "Yes" | "No";
type Sensitivity = "Low" | "Medium" | "High";
type Priority = "Normal" | "High";
const COMPLIANCE = ["GDPR", "SOC 2", "HIPAA", "Other"] as const;

const STEPS = ["Systems", "Workflows", "Data & Governance", "Summary"] as const;

interface FormState {
  crm: Crm;
  slack: YesNo;
  workspace: YesNo;
  apis: YesNo;
  apiNotes: string;
  volumes: Record<string, Volume>;
  priorities: Record<string, Priority>;
  sensitivity: Sensitivity;
  compliance: string[];
  governance: Governance | null; // null = follow the cart selection
}

type Plan = "Starter" | "Growth" | "Enterprise";

function recommend(f: FormState, governance: Governance, count: number): { plan: Plan; timeline: string } {
  const anyHigh = Object.values(f.volumes).includes("High");
  if (count >= 6 || (f.sensitivity === "High" && governance === "Advanced")) {
    return { plan: "Enterprise", timeline: "15+ days, phased rollout" };
  }
  if (count >= 3 || anyHigh || governance === "Advanced" || f.sensitivity === "High") {
    return { plan: "Growth", timeline: "10 to 14 days" };
  }
  return { plan: "Starter", timeline: "5 to 7 days" };
}

function Choice<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly T[];
  value: T | "";
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium ${
              value === o ? "border-brand bg-brand/5 text-brand" : "border-slate-300 hover:border-brand"
            }`}
          >
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function AuditWizard() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [checkout, setCheckout] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [form, setForm] = useState<FormState>({
    crm: "",
    slack: "No",
    workspace: "No",
    apis: "No",
    apiNotes: "",
    volumes: {},
    priorities: {},
    sensitivity: "Medium",
    compliance: [],
    governance: null,
  });

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const governance: Governance = form.governance ?? cart.governance;
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const integrations: IntegrationKey[] = [
    ...(form.crm === "Salesforce" || form.crm === "HubSpot" ? (["CRM"] as const) : []),
    ...(form.slack === "Yes" ? (["Slack"] as const) : []),
    ...(form.workspace === "Yes" ? (["Workspace"] as const) : []),
    ...(form.apis === "Yes" ? (["APIs"] as const) : []),
  ];

  const items = cart.ids.map(getWorkflow).filter((w): w is NonNullable<typeof w> => !!w);
  const pricing = calculatePricing({
    workflowIds: cart.ids,
    volumes: form.volumes,
    governance,
    integrations,
  });
  const { plan, timeline } = recommend(form, governance, items.length);
  const volumeOf = (id: string): Volume => form.volumes[id] ?? "Low";
  const hours = Math.round(items.reduce((s, w) => s + w.hoursSavedPerMonth * VOLUME_MULTIPLIER[volumeOf(w.id)], 0));
  const fte = items.reduce((s, w) => s + w.fteReplaced * VOLUME_MULTIPLIER[volumeOf(w.id)], 0);

  function next() {
    if (step === 0 && !form.crm) return setError("Select your CRM to continue.");
    if (step === 1 && items.length === 0) return setError("Select at least one workflow to continue.");
    setError("");
    setStep((s) => Math.min(s + 1, 3));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-brand" : "bg-slate-200"}`} />
            <p className={`mt-2 hidden text-xs font-medium sm:block ${i === step ? "text-brand" : "text-muted"}`}>
              {i + 1}. {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">Step {step + 1} of 4</p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold outline-none">
          {STEPS[step]}
        </h2>

        <div className="mt-6 space-y-6">
          {step === 0 && (
            <>
              <Choice name="crm" legend="CRM" options={["Salesforce", "HubSpot", "Other"] as const} value={form.crm} onChange={(v) => set("crm", v)} />
              <Choice name="slack" legend="Slack" options={["Yes", "No"] as const} value={form.slack} onChange={(v) => set("slack", v)} />
              <Choice name="workspace" legend="Google Workspace" options={["Yes", "No"] as const} value={form.workspace} onChange={(v) => set("workspace", v)} />
              <Choice name="apis" legend="Internal APIs" options={["Yes", "No"] as const} value={form.apis} onChange={(v) => set("apis", v)} />
              {form.apis === "Yes" && (
                <div>
                  <label htmlFor="api-notes" className="text-sm font-medium">
                    Briefly describe your internal APIs
                  </label>
                  <textarea
                    id="api-notes"
                    rows={3}
                    value={form.apiNotes}
                    onChange={(e) => set("apiNotes", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5"
                    placeholder="e.g. REST API for customer records, GraphQL for billing"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium">Preview connections (placeholders)</p>
                <div className="mt-2">
                  <CrmButtons />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <fieldset>
                <legend className="text-sm font-medium">Confirm selected workflows</legend>
                <div className="mt-2 grid max-h-64 gap-2 overflow-y-auto rounded-lg border border-slate-200 p-3 sm:grid-cols-2">
                  {WORKFLOWS.map((w) => (
                    <label key={w.id} className="flex cursor-pointer items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={cart.ids.includes(w.id)}
                        onChange={() => (cart.ids.includes(w.id) ? cart.remove(w.id) : cart.add(w.id))}
                        className="mt-1 accent-brand"
                      />
                      <span>
                        {w.name} <span className="text-muted">({w.category})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {items.length > 0 && (
                <ul className="space-y-4">
                  {items.map((w) => (
                    <li key={w.id} className="rounded-lg border border-slate-200 p-4">
                      <p className="font-semibold">{w.name}</p>
                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
                        <Choice
                          name={`vol-${w.id}`}
                          legend="Volume"
                          options={["Low", "Medium", "High"] as const}
                          value={volumeOf(w.id)}
                          onChange={(v) => set("volumes", { ...form.volumes, [w.id]: v })}
                        />
                        <Choice
                          name={`pri-${w.id}`}
                          legend="Priority"
                          options={["Normal", "High"] as const}
                          value={form.priorities[w.id] ?? "Normal"}
                          onChange={(v) => set("priorities", { ...form.priorities, [w.id]: v })}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <Choice name="sens" legend="Data sensitivity" options={["Low", "Medium", "High"] as const} value={form.sensitivity} onChange={(v) => set("sensitivity", v)} />
              <fieldset>
                <legend className="text-sm font-medium">Compliance</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {COMPLIANCE.map((c) => {
                    const on = form.compliance.includes(c);
                    return (
                      <label
                        key={c}
                        className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium ${on ? "border-brand bg-brand/5 text-brand" : "border-slate-300 hover:border-brand"}`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => set("compliance", on ? form.compliance.filter((x) => x !== c) : [...form.compliance, c])}
                          className="sr-only"
                        />
                        {c}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <Choice name="gov" legend="Governance level" options={["Standard", "Advanced"] as const} value={governance} onChange={(v) => set("governance", v)} />
            </>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-xl bg-navy p-5 text-white">
                <p className="text-sm text-slate-300">Recommended plan</p>
                <p className="font-heading text-3xl font-bold text-cyan">{plan}</p>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-300">Estimated deployment timeline</dt>
                    <dd className="font-semibold">{timeline}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-300">Estimated hours saved</dt>
                    <dd className="font-semibold">{hours.toLocaleString("en-US")} / month</dd>
                  </div>
                  <div>
                    <dt className="text-slate-300">Estimated FTE saved</dt>
                    <dd className="font-semibold">{fte.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
              <dl className="divide-y divide-line rounded-xl border border-line text-sm">
                <Line label="CRM" value={form.crm || "Not specified"} />
                <Line label="Slack / Workspace / Internal APIs" value={`${form.slack} / ${form.workspace} / ${form.apis}`} />
                <Line label="Workflows" value={items.map((w) => `${w.name} (${volumeOf(w.id)})`).join(", ") || "None"} />
                <Line label="Data sensitivity" value={form.sensitivity} />
                <Line label="Compliance" value={form.compliance.join(", ") || "None selected"} />
                <Line label="Governance" value={governance} />
                <Line label="Estimated price" value={`${formatUsd(pricing.monthly)}/mo · ${formatUsd(pricing.annual)}/yr`} />
              </dl>
              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="w-full rounded-lg bg-brand py-3 font-semibold text-white hover:bg-brand-dark"
              >
                Proceed to Pricing &amp; Checkout
              </button>
              <p className="text-xs text-muted">
                Front-end demo with sample data. Nothing is submitted, and checkout runs in Stripe test mode.{" "}
                <Link href="/cart" className="text-brand underline">
                  Back to cart
                </Link>
              </p>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-ink">
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 && (
            <button type="button" onClick={next} className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
              Next
            </button>
          )}
        </div>
      </div>

      <StripeTestCheckout
        open={checkout}
        onClose={() => setCheckout(false)}
        monthly={pricing.monthly}
        annual={pricing.annual}
        summary={`${plan} plan: ${items.length} workflow(s), ${governance} governance.`}
      />
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium sm:text-right">{value}</dd>
    </div>
  );
}
