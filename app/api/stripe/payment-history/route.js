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
    const charges = await stripe.charges.list({ customer: customerId });

    return NextResponse.json(charges.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
