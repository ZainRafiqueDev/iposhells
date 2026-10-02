import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ROICalculator } from "@/components/ROICalculator";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agentic ROI Calculator | iposhells",
  description: "Estimate the hours saved, FTE equivalent, and annual savings from automating manual workflows with iposhells.",
  alternates: { canonical: "/roi-calculator" },
};

export default function RoiPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Agentic Workflow ROI Calculator",
          url: `${SITE_URL}/roi-calculator`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <section className="grid-bg bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan">ROI Calculator</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Agentic Workflow ROI Calculator</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Estimate the impact of iposhells on your operations.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ROICalculator />
      </div>
    </>
  );
}
