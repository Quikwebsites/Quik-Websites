import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { customerId, paymentMethodId } = await request.json();

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID is required" },
      { status: 400 },
    );
  }

  try {
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
