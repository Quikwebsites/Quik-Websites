import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request) {
  const { keyword } = await request.json();

  console.log("Incoming request headers:", Object.fromEntries(request.headers));

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const response = await fetch("https://api.name.com/v4/domains:search", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NAME_API_USERNAME}:${process.env.NAME_API_TOKEN}`,
          ),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: keyword }),
    });
    const result = await response.json();

    if (!response.ok)
      return NextResponse.json(
        { error: "Response not ok", result },
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );

    return NextResponse.json(result, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
