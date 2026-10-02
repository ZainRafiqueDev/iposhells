import type { Metadata } from "next";
import { AuditWizard } from "@/components/AuditWizard";

export const metadata: Metadata = {
  title: "Architecture Audit | iposhells",
  description: "Replace discovery calls with a guided 4-step Architecture Audit: systems, workflows, data governance, and a recommended plan.",
  alternates: { canonical: "/architecture-audit" },
};

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Architecture Audit Wizard</h1>
        <p className="mt-2 text-muted">A guided audit that replaces discovery calls. No phone calls, no sales reps.</p>
      </div>
      <div className="mt-8">
        <AuditWizard />
      </div>
    </div>
  );
}
