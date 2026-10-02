"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateRoi } from "@/lib/roi";
import { AUDIT_PATH } from "@/lib/site";

const num = (v: string) => (v === "" ? 0 : Number(v));

function Field({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1.5 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
        {prefix && <span className="pl-3 text-slate-500">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 outline-none"
        />
        {suffix && <span className="pr-3 text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
}

export function ROICalculator() {
  const [fte, setFte] = useState("5");
  const [hours, setHours] = useState("20");
  const [cost, setCost] = useState("90000");
  const [coverage, setCoverage] = useState("60");

  const result = useMemo(
    () =>
      calculateRoi({
        fte: num(fte),
        hoursPerWeek: num(hours),
        annualCostPerFte: num(cost),
        coveragePct: num(coverage),
      }),
    [fte, hours, cost, coverage],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
        aria-label="ROI inputs"
      >
        <Field id="fte" label="Number of FTEs on manual workflows" value={fte} onChange={setFte} />
        <Field
          id="hours"
          label="Average hours per FTE per week on manual tasks"
          value={hours}
          onChange={setHours}
          max={168}
          suffix="hrs"
        />
        <Field
          id="cost"
          label="Average fully loaded cost per FTE (annual)"
          value={cost}
          onChange={setCost}
          step={1000}
          prefix="$"
        />
        <div>
          <label htmlFor="coverage" className="flex items-baseline justify-between text-sm font-medium text-ink">
            <span>Estimated automation coverage</span>
            <span className="font-heading text-lg font-bold text-brand">{Math.min(Math.max(num(coverage), 0), 100)}%</span>
          </label>
          <input
            id="coverage"
            type="range"
            min={0}
            max={100}
            step={5}
            value={Math.min(Math.max(num(coverage), 0), 100)}
            onChange={(e) => setCoverage(e.target.value)}
            className="mt-2 w-full accent-brand"
          />
          <p className="mt-1 text-xs text-muted">Share of manual work you expect to automate.</p>
        </div>
      </form>

      <div className="flex flex-col rounded-2xl bg-navy p-6 text-white shadow-sm sm:p-8" aria-live="polite">
        <h2 className="font-heading text-lg font-semibold text-cyan">Estimated impact</h2>
        <dl className="mt-6 space-y-6">
          <div>
            <dt className="text-sm text-slate-300">Estimated annual hours saved</dt>
            <dd className="font-heading text-4xl font-bold">
              {Math.round(result.annualHoursSaved).toLocaleString("en-US")} <span className="text-lg font-medium">hours</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-300">FTE equivalent replaced</dt>
            <dd className="font-heading text-4xl font-bold">
              {result.fteEquivalent.toFixed(2)} <span className="text-lg font-medium">FTEs</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-300">Estimated annual savings</dt>
            <dd className="font-heading text-4xl font-bold text-cyan">
              {Math.round(result.annualSavings).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          Estimates only. Savings = FTE equivalent of automated hours × fully loaded annual cost per FTE, based on a
          40-hour week and 52 weeks.
        </p>
        <Link
          href={AUDIT_PATH}
          className="mt-auto inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Schedule Your Architecture Audit
        </Link>
      </div>
    </div>
  );
}
