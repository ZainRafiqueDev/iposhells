
export async function POST(request: Request) {
  const event = await request.json().catch(() => null);
  if (event?.type === "checkout.session.completed") {
    console.log("Test Mode: Checkout completed successfully.");
  }
  return Response.json({ received: true });
}
