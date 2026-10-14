import type { Metadata } from "next";
import { Wordmark } from "@/components/Logo";
import { ButtonLink, Section } from "@/components/ui";
import { AUDIT_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who We Are | iposhells",
  description:
    "Empowering public companies through precision audits and next-gen automation. Led by CEO Rick Plotnikoff, the IPO Center and iposhells bring PCAOB-grade rigor to agentic workflows.",
  alternates: { canonical: "/who-we-are" },
};

const TRUST_POINTS = [
  {
    title: "Deep Public Company Expertise",
    body: "Led by CEO Rick Plotnikoff, our team brings battle-tested experience navigating complex regulatory landscapes.",
  },
  {
    title: "Next-Generation Automation",
    body: "Our Agentic Workflow System transforms traditional audit and compliance burdens into seamless, cost-effective digital processes.",
  },
  {
    title: "Significant Cost Savings",
    body: "We enable multinational enterprises to drive down overhead and save millions each year through intelligent automation.",
  },
];

const PCAOB_POINTS = [
  {
    title: "Governing Body Alignment",
    body: "Established by the Sarbanes-Oxley Act of 2002 to protect investors and ensure accurate, independent audit reports.",
  },
  {
    title: "Mandatory Scope Expertise",
    body: "Specialized experience catering to U.S. public companies, other issuers, and SEC-registered broker-dealers.",
  },
  {
    title: "Integrated Audits",
    body: "Seamlessly combining opinions on financial statements with evaluations of the effectiveness of internal control over financial reporting.",
  },
  {
    title: "Strict Documentation & Independence",
    body: "Enforcing rigorous documentation, risk assessment, and independence rules that go above and beyond private company AICPA/GAAS standards.",
  },
  {
    title: "Comprehensive Core Functions",
    body: "Covering registration, inspection of accounting firms, standard-setting, and enforcement protocols.",
  },
];

function PointGrid({ points }: { points: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p) => (
        <li key={p.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function WhoWeArePage() {
  return (
    <>
      <section className="hero-glow text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Who We Are</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">
            Empowering Public Companies Through Precision Audits &amp; Next-Gen Automation
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            At the IPO Center, our leadership—led by CEO Rick Plotnikoff and our team of expert auditors—has a proven
            track record of guiding public companies through some of the most complex, high-stakes audits in the
            industry.
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            Building on decades of deep audit experience, IPOShells and our proprietary Agentic Workflow System
            represent a natural evolution in financial compliance. We help multinational and public corporations
            streamline operations, maintain rigorous compliance, and save millions annually.
          </p>
        </div>
      </section>

      <Section eyebrow="Why iposhells" title="Why Top-Tier Companies Trust Us">
        <PointGrid points={TRUST_POINTS} />
      </Section>

      <Section
        eyebrow="Compliance"
        title="Built for Rigorous PCAOB Standards"
        intro="We design our processes to meet and exceed the stringent standards required by the regulatory framework. Here is how our background aligns with PCAOB Audit Standards:"
      >
        <PointGrid points={PCAOB_POINTS} />
      </Section>

      <Section title="Ready to Transform Your Audit Workflow?" dark>
        <div className="max-w-3xl">
          <div className="mb-8">
            <Wordmark light />
          </div>
          <p className="text-lg leading-relaxed text-slate-300">
            Partner with IPOshells and discover how our Agentic Workflow System can save your organization time and
            capital.
          </p>
          <div className="mt-8">
            <ButtonLink href={AUDIT_PATH}>Schedule Your Architecture Audit</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
