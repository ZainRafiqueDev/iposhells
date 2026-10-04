"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function AddToCartButton({ id, label = "Add to Cart", dark = false }: { id: string; label?: string; dark?: boolean }) {
  const { add, has, hydrated } = useCart();
  const inCart = hydrated && has(id);

  if (inCart) {
    return (
      <Link
        href="/cart"
        className={`inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold ${
          dark ? "border-cyan text-cyan" : "border-brand text-brand"
        }`}
      >
        ✓ In cart: view cart
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => add(id)}
      className="inline-flex items-center justify-center rounded-lg btn-primary px-4 py-2.5 text-sm font-semibold text-white transition"
    >
      {label}
    </button>
  );
}
