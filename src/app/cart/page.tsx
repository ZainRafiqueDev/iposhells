import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Agentic Workflow Cart | iposhells",
  description: "Review your selected workflows, governance package, and integrations before the Architecture Audit.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Agentic Workflow Cart</h1>
      <p className="mt-2 max-w-2xl text-muted">Select workflows, choose governance and integration support, then continue to the Architecture Audit.</p>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
