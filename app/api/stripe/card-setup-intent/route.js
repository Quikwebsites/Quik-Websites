import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { customerId } = await request.json();

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID is required" },
      { status: 400 },
    );
  }

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    });

    return NextResponse.json(setupIntent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
