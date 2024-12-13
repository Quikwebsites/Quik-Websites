import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_WEBFLOW_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request) {
  const { domain } = await request.json();

  try {
    const response = await fetch(
      "https://api.name.com/v4/domains:checkAvailability",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            btoa(
              `${process.env.NAME_API_USERNAME}:${process.env.NAME_API_TOKEN}`,
            ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domainNames: [domain] }),
      },
    );
    const result = await response.json();

    if (!response.ok)
      return NextResponse.json(
        { error: "Response not ok", result },
        { status: 500 },
      );

    return NextResponse.json(result, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
