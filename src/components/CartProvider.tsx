"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Governance, IntegrationKey } from "@/lib/workflows";

interface CartState {
  ids: string[];
  governance: Governance;
  integrations: IntegrationKey[];
}

interface CartContextValue extends CartState {
  hydrated: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  setGovernance: (g: Governance) => void;
  toggleIntegration: (key: IntegrationKey) => void;
}

const STORAGE_KEY = "iposhells-cart-v1";
const EMPTY: CartState = { ids: [], governance: "Standard", integrations: [] };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  // Restore the sample cart for this browser tab. Storage may be blocked, so every access is guarded.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from sessionStorage after mount
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* storage unavailable: start with an empty cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const add = useCallback(
    (id: string) => setState((s) => (s.ids.includes(id) ? s : { ...s, ids: [...s.ids, id] })),
    [],
  );
  const remove = useCallback((id: string) => setState((s) => ({ ...s, ids: s.ids.filter((x) => x !== id) })), []);
  const clear = useCallback(() => setState(EMPTY), []);
  const setGovernance = useCallback((governance: Governance) => setState((s) => ({ ...s, governance })), []);
  const toggleIntegration = useCallback(
    (key: IntegrationKey) =>
      setState((s) => ({
        ...s,
        integrations: s.integrations.includes(key)
          ? s.integrations.filter((k) => k !== key)
          : [...s.integrations, key],
      })),
    [],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      hydrated,
      add,
      remove,
      clear,
      has: (id) => state.ids.includes(id),
      setGovernance,
      toggleIntegration,
    }),
    [state, hydrated, add, remove, clear, setGovernance, toggleIntegration],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
