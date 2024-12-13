import { NextResponse } from "next/server";

const apiUsername = "quikwebsites";
const apiToken = "887dc9b929b297771e16ffa54bab1c98ff553930";
const apiUrl = "https://api.name.com/v4/domains:checkAvailability";

export async function POST(request) {
  const domain = request.nextUrl.searchParams.get("domain");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${apiUsername}:${apiToken}`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainNames: [domain] }),
    });
    const result = await response.json();

    if (!response.ok)
      return NextResponse.json(
        { error: "Response not ok", result },
        { status: 500 },
      );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
