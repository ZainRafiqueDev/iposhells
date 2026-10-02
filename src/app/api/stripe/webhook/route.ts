// Test-mode stub (adapted from the client's handleStripeWebhookStub).
// Acknowledges events only. No signature verification, database, or billing logic in Phase 1.
export async function POST(request: Request) {
  const event = await request.json().catch(() => null);
  if (event?.type === "checkout.session.completed") {
    console.log("Test Mode: Checkout completed successfully.");
  }
  return Response.json({ received: true });
}
