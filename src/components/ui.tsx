import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-cyan text-navy hover:bg-cyan/90",
  ghost: "border border-white/30 text-white hover:border-cyan hover:text-cyan",
} as const;

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  dark = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-16 py-16 sm:py-20 ${dark ? "bg-navy text-white" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={`text-sm font-semibold uppercase tracking-wider ${dark ? "text-cyan" : "text-brand"}`}>
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
          {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-muted"}`}>{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#0a1022]">
      <figcaption className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan">
        {label}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
