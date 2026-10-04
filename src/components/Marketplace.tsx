"use client";

import { useState } from "react";
import { CATEGORIES, WORKFLOWS, formatUsd, type Category } from "@/lib/workflows";
import { AddToCartButton } from "./AddToCartButton";

export function Marketplace() {
  const [active, setActive] = useState<Category | "All">("All");
  const list = active === "All" ? WORKFLOWS : WORKFLOWS.filter((w) => w.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              active === c ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-ink hover:border-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <li key={w.id} className="card card-hover flex flex-col p-6">
            <span className="w-fit rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">{w.category}</span>
            <h3 className="mt-3 text-lg font-bold">{w.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{w.description}</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="font-medium">Integrations:</dt>
                <dd className="text-muted">{w.integrations.join(", ")}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Output:</dt>
                <dd className="text-muted">{w.outputSchema}</dd>
              </div>
            </dl>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <span className="text-sm text-muted">
                from <strong className="text-ink">{formatUsd(w.basePrice)}</strong>/mo
              </span>
              <AddToCartButton id={w.id} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">Sample pricing for demonstration. Final pricing is generated from your Architecture Audit.</p>
    </div>
  );
}
