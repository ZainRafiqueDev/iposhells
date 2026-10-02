"use client";

import { useState } from "react";
import { crmPlaceholders, type CrmKey } from "@/lib/stubs";

const BUTTONS: { key: CrmKey; label: string }[] = [
  { key: "salesforce", label: "Salesforce" },
  { key: "hubspot", label: "HubSpot" },
  { key: "slack", label: "Slack" },
];

export function CrmButtons({ dark = false }: { dark?: boolean }) {
  const [connected, setConnected] = useState<Partial<Record<CrmKey, boolean>>>({});
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {BUTTONS.map(({ key, label }) => {
          const on = connected[key];
          return (
            <button
              key={key}
              type="button"
              aria-pressed={!!on}
              onClick={() => {
                setConnected((c) => ({ ...c, [key]: true }));
                setMessage(crmPlaceholders[key]());
              }}
              className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                on
                  ? "border-cyan bg-cyan/15 text-cyan"
                  : dark
                    ? "border-white/30 text-white hover:border-cyan hover:text-cyan"
                    : "border-slate-300 bg-white text-ink hover:border-brand hover:text-brand"
              }`}
            >
              {on ? `✓ ${label} connected` : `Connect ${label}`}
            </button>
          );
        })}
      </div>
      <p role="status" className={`mt-3 min-h-5 text-sm ${dark ? "text-slate-300" : "text-muted"}`}>
        {message || "Placeholder connections only. No sign-in or data is sent."}
      </p>
    </div>
  );
}
