import { NextResponse } from "next/server";

// Broad CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
};

export function middleware(request) {
  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Modify response to include CORS headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Apply middleware to API routes
export const config = {
  matcher: "/api/:path*",
};
