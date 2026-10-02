// Front-end placeholders only. No real OAuth, payments, or network calls.
// Adapted from the client's reference stubs (momna1.docx): the original used alert(),
// which blocks the page, so these resolve with a message the UI can show inline.

export type CrmKey = "salesforce" | "hubspot" | "slack";

export const crmPlaceholders: Record<CrmKey, () => string> = {
  salesforce: () => "Salesforce OAuth placeholder connected",
  hubspot: () => "HubSpot OAuth placeholder connected",
  slack: () => "Slack notification webhook placeholder connected",
};

export interface TestCheckoutSession {
  id: string;
  mode: "test";
  status: "complete";
  amountMonthly: number;
}

/** Simulates creating a Stripe Checkout session in test mode. Nothing is charged or sent. */
export async function createTestCheckoutSession(amountMonthly: number): Promise<TestCheckoutSession> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  const suffix = Math.random().toString(36).slice(2, 12);
  return { id: `cs_test_${suffix}`, mode: "test", status: "complete", amountMonthly };
}
