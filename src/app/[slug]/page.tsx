import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CodeBlock, Section } from "@/components/ui";
import { LANDING_PAGES, getLandingPage } from "@/lib/landing-pages";
import { AUDIT_PATH, SITE_NAME, SITE_URL } from "@/lib/site";
import { getWorkflow } from "@/lib/workflows";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: `${SITE_URL}/${page.slug}`, type: "website" },
  };
}

export default async function LandingPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();
  const workflow = getWorkflow(page.workflowId);
  const url = `${SITE_URL}/${page.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.metaDescription,
      url,
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      serviceType: "Enterprise workflow automation",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <section className="grid-bg bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
            <Link href="/" className="hover:text-cyan">
              Home
            </Link>
            <span aria-hidden> / </span>
            <span className="text-slate-200">{page.navLabel}</span>
          </nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-cyan">{page.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{page.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={AUDIT_PATH}>Schedule Your Architecture Audit</ButtonLink>
            {workflow && <AddToCartButton id={workflow.id} label={`Add "${workflow.name}" to Cart`} dark />}
          </div>
        </div>
      </section>

      <Section eyebrow="The problem" title={page.problem.heading}>
        <ul className="grid gap-5 md:grid-cols-3">
          {page.problem.points.map((p) => (
            <li key={p} className="rounded-2xl border border-line bg-white p-6 text-muted shadow-sm">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section dark eyebrow="How it works" title="Three steps from source data to governed output">
        <ol className="grid gap-5 md:grid-cols-3">
          {page.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-navy-800 p-6">
              <span className="font-heading text-sm font-bold text-cyan">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-300">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Outputs" title="What the workflow delivers" intro="Structured, schema-versioned outputs ready for downstream systems. Examples are illustrative.">
        <div className="grid gap-5 lg:grid-cols-2">
          {page.outputs.map((o) => (
            <CodeBlock key={o.label} label={o.label} code={o.code} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Integrations" title="Connects to the systems you already use" dark>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {page.integrations.map((i) => (
            <li key={i.name} className="rounded-2xl border border-white/10 bg-navy-800 p-5">
              <h3 className="font-semibold text-white">{i.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{i.capability}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Governance and outcomes" title="Controlled by design">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-lg font-bold">Governance</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              {page.governance.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-lg font-bold">Outcomes</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              {page.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Common questions">
        <div className="max-w-3xl space-y-3">
          {page.faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-line bg-white p-5">
              <summary className="cursor-pointer font-semibold marker:text-brand">{f.q}</summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Map this workflow to your systems</h2>
            <p className="mt-2 max-w-xl text-blue-100">
              Complete the Architecture Audit to get a recommended plan, timeline, and estimated impact.
            </p>
          </div>
          <ButtonLink href={AUDIT_PATH} variant="secondary">
            Start the Architecture Audit
          </ButtonLink>
        </div>
      </section>

      <Section title="Related workflow audits">
        <ul className="grid gap-5 md:grid-cols-2">
          {page.related.map((slugRel) => {
            const rel = getLandingPage(slugRel);
            return rel ? (
              <li key={rel.slug}>
                <Link href={`/${rel.slug}`} className="block rounded-2xl border border-line bg-white p-6 hover:border-brand">
                  <h3 className="text-lg font-bold">{rel.title}</h3>
                  <p className="mt-2 text-sm text-muted">{rel.metaDescription}</p>
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </Section>
    </>
  );
}
