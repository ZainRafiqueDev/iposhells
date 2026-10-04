"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "./Logo";
import { useCart } from "./CartProvider";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { AUDIT_PATH, NAV_LINKS } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const { ids, hydrated } = useCart();
  const count = hydrated ? ids.length : 0;
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="iposhells home" onClick={close}>
          <Wordmark light />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-200 hover:text-cyan">
              {l.label}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="text-sm text-slate-200 hover:text-cyan group-focus-within:text-cyan"
              aria-haspopup="true"
            >
              Workflow Audits
              <span aria-hidden> ▾</span>
            </button>
            <div className="invisible absolute left-0 top-full w-80 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-xl border border-white/10 bg-navy-800 p-2 shadow-xl">
                {LANDING_PAGES.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-cyan"
                    >
                      {p.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative rounded-lg border border-white/20 px-3 py-2 text-sm text-white hover:border-cyan hover:text-cyan"
          >
            Cart
            {count > 0 && (
              <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-cyan px-1.5 text-xs font-bold text-navy">
                {count}
              </span>
            )}
          </Link>
          <Link
            href={AUDIT_PATH}
            className="hidden rounded-lg btn-primary px-4 py-2 text-sm font-semibold text-white sm:inline-block"
          >
            Architecture Audit
          </Link>
          <button
            type="button"
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-navy px-4 pb-4 lg:hidden">
          <ul className="space-y-1 pt-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block rounded-lg px-3 py-2 text-slate-100 hover:bg-white/10">
                  {l.label}
                </Link>
              </li>
            ))}
            {LANDING_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  onClick={close}
                  className="block rounded-lg px-3 py-2 text-slate-100 hover:bg-white/10"
                >
                  {p.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={AUDIT_PATH}
                onClick={close}
                className="mt-2 block rounded-lg bg-brand px-3 py-2 text-center font-semibold text-white"
              >
                Schedule Your Architecture Audit
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
