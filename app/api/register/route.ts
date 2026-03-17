import { NextRequest, NextResponse } from "next/server";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

function filterHeaders(headers: Headers) {
  const out = new Headers();
  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      out.set(key, value);
    }
  }
  return out;
}

async function proxy(req: NextRequest) {
  const backendBase = process.env.BACKEND_URL || "http://13.60.168.165:8000";
  const target = new URL("/api/register", backendBase);
  target.search = req.nextUrl.search;

  const incomingHeaders = filterHeaders(req.headers);
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

  const upstream = await fetch(target, {
    method: req.method,
    headers: incomingHeaders,
    body,
  });

  const respHeaders = filterHeaders(upstream.headers);
  const respBody = await upstream.arrayBuffer();

  return new NextResponse(respBody, {
    status: upstream.status,
    headers: respHeaders,
  });
}

export async function GET(req: NextRequest) {
  return proxy(req);
}

export async function POST(req: NextRequest) {
  return proxy(req);
}

export async function PUT(req: NextRequest) {
  return proxy(req);
}

export async function PATCH(req: NextRequest) {
  return proxy(req);
}

export async function DELETE(req: NextRequest) {
  return proxy(req);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
