import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request) {
  const customerId = request.nextUrl.searchParams.get("customerId");

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID is required" },
      { status: 400 },
    );
  }

  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      customerId,
      { type: "card" },
    );

    const customer = await stripe.customers.retrieve(customerId);
    const defaultPaymentMethodId =
      customer.invoice_settings.default_payment_method;

    return NextResponse.json(
      {
        paymentMethods: paymentMethods.data,
        defaultPaymentMethodId,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
