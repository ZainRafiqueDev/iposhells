import Link from "next/link";
import { Wordmark } from "./Logo";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { AUDIT_PATH } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Wordmark light />
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            Integrated Process Optimization. Autonomous workflows, secure data orchestration, and enterprise governance.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Workflow audits</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {LANDING_PAGES.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-cyan">
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Platform</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#marketplace" className="hover:text-cyan">
                Workflow Marketplace
              </Link>
            </li>
            <li>
              <Link href="/roi-calculator" className="hover:text-cyan">
                ROI Calculator
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-cyan">
                Workflow Cart
              </Link>
            </li>
            <li>
              <Link href={AUDIT_PATH} className="hover:text-cyan">
                Architecture Audit
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} iposhells. All rights reserved.
      </div>
    </footer>
  );
}
