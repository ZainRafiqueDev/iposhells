import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CrmButtons } from "@/components/CrmButtons";
import { JsonLd } from "@/components/JsonLd";
import { Marketplace } from "@/components/Marketplace";
import { ROICalculator } from "@/components/ROICalculator";
import { ButtonLink, CodeBlock, Section } from "@/components/ui";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { AUDIT_PATH, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agentic Data Infrastructure | iposhells",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const PILLARS = [
  { name: "Nodes", body: "Agentic operations nodes execute workflows autonomously, replacing manual operational tasks." },
  { name: "Channels", body: "Secure data channels route structured and unstructured data between systems." },
  { name: "Governance", body: "RBAC, encryption, and audit logging on every workflow, aligned to compliance requirements." },
  { name: "Integrations", body: "Salesforce, HubSpot, Slack, Google Workspace, cloud storage, and internal systems." },
];

const FLOW = ["Agents", "Nodes", "Channels", "Governance", "Systems"];

const PROOF = [
  { stat: "24/7", label: "Autonomous execution", note: "Pipelines run continuously, not on business hours." },
  { stat: "40–70%", label: "Reduction in manual workload", note: "Typical range across automated workflows." },
  { stat: "3–7 FTE", label: "Equivalent capacity replaced", note: "Depending on workflow scope and volume." },
];

const REFERENCES = [
  {
    name: "Sterling Investment Corp.",
    logo: "/brand/client-sterling.png",
    size: [255, 225],
    quote: "Thanks to IPO Shells, our company has saved more than $87,000 per quarter with their amazing insights on our workforce.",
  },
  {
    name: "L & S Real-estate Group",
    logo: "/brand/client-ls.png",
    size: [335, 180],
    quote: "Not sure how you guys did it, but you saved us thousands of dollars in 1 month. Your system is a no-brainer for companies that have more than 10 people.",
  },
  {
    name: "Merchant Billing Corp.",
    logo: "/brand/client-merchant.png",
    size: [255, 215],
    quote: "Any company that has a medium sales group needs your services. Thanks again for such a detailed audit of our outdated and wasted infrastructure.",
  },
  {
    name: "Godwin Services Inc.",
    logo: "/brand/client-godwin.png",
    size: [280, 205],
    quote: "Your group has some of the most amazing talent for finding out all our flaws. We will be using you as a monthly asset for us.",
  },
  {
    name: "Shopcom Holdings Ltd.",
    logo: "/brand/client-shopcom.png",
    size: [250, 205],
    quote: "Thanks for saving us time and energy on wasted staffing. We should have found you years ago. We wasted so much money on our overlapping workforce.",
  },
];

const SECURITY = ["Role-based access control", "Encryption in transit and at rest", "Audit logging", "Data isolation"];

const TIMELINE = [
  { phase: "Discovery", days: "Days 1–2", body: "Architecture audit, workflow mapping, data channels, governance requirements." },
  { phase: "Integration setup", days: "Days 3–5", body: "CRM connection, internal system access, data routing, RBAC setup." },
  { phase: "Workflow deployment", days: "Days 6–10", body: "Outbound engine, research pipelines, operational workflows, schema validation." },
  { phase: "Governance activation", days: "Days 11–14", body: "Audit logging, encryption verification, access control testing, compliance alignment." },
  { phase: "Optimization & scaling", days: "Day 15+", body: "Dashboard monitoring, throughput analysis, workflow tuning, expansion." },
];

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Agentic Data Infrastructure",
    brand: { "@type": "Brand", name: "iposhells" },
    description: "Autonomous workflows, secure data orchestration, enterprise governance.",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Agentic Data Infrastructure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agentic Data Infrastructure enables autonomous workflows, secure data routing, and enterprise governance.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "iposhells",
    url: SITE_URL,
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />

      {/* 1. Hero */}
      <section className="hero-glow relative overflow-hidden text-white">
        <div className="fade-up mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Integrated Process Optimization</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Agentic Data Infrastructure for <span className="text-gradient">Enterprise Automation</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Autonomous workflows. Secure data orchestration. Proven ROI.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={AUDIT_PATH}>Schedule Your Architecture Audit</ButtonLink>
              <ButtonLink href="#marketplace" variant="ghost">
                Browse Workflows
              </ButtonLink>
            </div>
          </div>
          <div className="logo-halo float-slow mx-auto w-full max-w-sm">
            <Image
              src="/brand/logo.png"
              alt="iposhells seal: Integrated Process Optimization"
              width={512}
              height={512}
              priority
              className="rounded-full shadow-2xl ring-4 ring-gold/40"
            />
          </div>
        </div>
      </section>

      {/* 2. Proof layer */}
      <Section eyebrow="Proof" title="Built for enterprise outcomes" intro="Autonomous execution with the security posture enterprise buyers expect.">
        <ul className="grid gap-5 md:grid-cols-3">
          {PROOF.map((p) => (
            <li key={p.label} className="card card-hover p-6">
              <p className="text-gradient font-heading text-5xl font-extrabold">{p.stat}</p>
              <p className="mt-2 font-semibold">{p.label}</p>
              <p className="mt-1 text-sm text-muted">{p.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 card p-6">
          <h3 className="font-semibold">Security posture</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span aria-hidden className="text-cyan">●</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. Product visibility */}
      <Section
        dark
        eyebrow="Product"
        title="See a workflow run end to end"
        intro="Every workflow is visible in the dashboard and produces a structured, schema-versioned output."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-navy-800 p-5" role="img" aria-label="Illustration of a workflow dashboard showing three active workflows">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-heading font-semibold">Workflow dashboard</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">All systems active</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["Autonomous Outbound Engine", "Active", "w-4/5"],
                ["CRM Sync", "Active", "w-3/5"],
                ["Compliance Report Generation", "Deploying", "w-2/5"],
              ].map(([name, status, width]) => (
                <li key={name}>
                  <div className="flex justify-between">
                    <span>{name}</span>
                    <span className={status === "Active" ? "text-emerald-300" : "text-cyan"}>{status}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/10">
                    <div className={`h-2 rounded-full bg-brand ${width}`} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">Illustrative preview.</p>
          </div>
          <CodeBlock
            label="Output schema example: enriched lead (JSON)"
            code={`{
  "company": "Sterling Investment Corp",
  "domain": "sterlinginvest.com",
  "contact_name": "Jane Doe",
  "role": "VP Finance",
  "score": 87,
  "source": "Outbound Engine",
  "last_updated": "2026-09-24T08:30:00Z"
}`}
          />
        </div>
      </Section>

      {/* 4. Architecture */}
      <Section id="architecture" eyebrow="Architecture" title="Four pillars, one governed layer" intro="Agentic Data Infrastructure is the layer that lets AI agents execute governed, secure, and integrated workflows at scale.">
        <ol aria-label="Architecture flow" className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {FLOW.map((f, i) => (
            <li key={f} className="flex flex-1 items-center gap-2">
              <span className="flex-1 rounded-xl bg-navy px-4 py-3 text-center font-heading font-semibold text-white">{f}</span>
              {i < FLOW.length - 1 && <span aria-hidden className="hidden text-cyan md:block">→</span>}
            </li>
          ))}
        </ol>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <li key={p.name} className="card card-hover p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-heading text-sm font-bold text-brand">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Workflow marketplace + landing pages */}
      <Section id="marketplace" eyebrow="Workflow Marketplace" title="Ready-to-deploy agentic workflows" intro="Enterprises don’t buy platforms. They buy workflows. Activate them in days, not months.">
        <Marketplace />
      </Section>

      <Section dark eyebrow="Workflow audits" title="Start with the workflow that matters most">
        <ul className="grid gap-5 md:grid-cols-3">
          {LANDING_PAGES.map((p) => (
            <li key={p.slug}>
              <Link href={`/${p.slug}`} className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800 p-6 transition hover:border-cyan">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan">{p.eyebrow}</span>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-300">{p.metaDescription}</p>
                <span className="mt-4 text-sm font-semibold text-cyan">Learn more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Client validation: References */}
      <Section id="references" eyebrow="Client validation" title="References">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REFERENCES.map((r) => (
            <li key={r.name} className="flex">
              <figure className="card card-hover quote-mark relative flex w-full flex-col overflow-hidden border-t-4 border-t-gold p-6">
                <div className="flex h-36 items-center justify-center rounded-xl bg-white">
                  <Image
                    src={r.logo}
                    alt={`${r.name} logo`}
                    width={r.size[0]}
                    height={r.size[1]}
                    className="max-h-32 w-auto object-contain"
                  />
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">“{r.quote}”</blockquote>
                <figcaption className="mt-4 border-t border-line pt-3 font-heading text-sm font-bold text-navy">
                  {r.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-muted">
          Case study: a mid-market financial institution deployed iposhells to automate KYC aggregation and regulatory
          reporting, reducing manual workload by 60% and improving reporting accuracy.
        </p>
      </Section>

      {/* ROI */}
      <Section dark eyebrow="ROI Calculator" title="Estimate your impact" intro="Enter your team’s manual workload to see hours saved, FTE equivalent, and annual savings.">
        <ROICalculator />
      </Section>

      {/* Deployment */}
      <Section eyebrow="Deployment" title="Days and weeks, not months">
        <ol className="grid gap-4 md:grid-cols-5">
          {TIMELINE.map((t) => (
            <li key={t.phase} className="card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">{t.days}</p>
              <h3 className="mt-1 font-semibold">{t.phase}</h3>
              <p className="mt-2 text-sm text-muted">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Integrations */}
      <Section dark eyebrow="Integrations" title="Connects to the systems you already use" intro="Each integration is governed, logged, and designed for secure data orchestration.">
        <CrmButtons dark />
      </Section>

      {/* 6. Domain alignment */}
      <Section eyebrow="About iposhells" title="What is Agentic Data Infrastructure?">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          Agentic Data Infrastructure is the next evolution of enterprise automation. Instead of tools that require human
          operators, iposhells provides autonomous systems that execute workflows, orchestrate data, and deliver outcomes
          without manual intervention. The iposhells agentic infrastructure platform powers 24/7 autonomous pipelines,
          secure data routing, and enterprise-grade governance.
        </p>
      </Section>

      {/* 7. CTA */}
      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Book an Architecture Audit</h2>
            <p className="mt-2 max-w-xl text-blue-100">
              Map your workflows, data channels, and governance requirements, and see how agentic infrastructure can
              replace manual operations.
            </p>
          </div>
          <ButtonLink href={AUDIT_PATH} variant="secondary">
            Schedule Your Architecture Audit
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
