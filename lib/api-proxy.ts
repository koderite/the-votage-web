import { NextRequest, NextResponse } from 'next/server'

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
])

function filterHeaders(headers: Headers) {
  const out = new Headers()
  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      out.set(key, value)
    }
  }
  return out
}

interface ProxyMethods {
  GET: (req: NextRequest) => Promise<NextResponse>
  POST: (req: NextRequest) => Promise<NextResponse>
  PUT: (req: NextRequest) => Promise<NextResponse>
  PATCH: (req: NextRequest) => Promise<NextResponse>
  DELETE: (req: NextRequest) => Promise<NextResponse>
  OPTIONS: () => NextResponse
}

export function createProxyRoute(targetPath: string): ProxyMethods {
  const backendBase =
    process.env.BACKEND_URL || 'http://13.60.168.165:8000'

  async function proxy(req: NextRequest) {
    const target = new URL(targetPath, backendBase)
    target.search = req.nextUrl.search

    const incomingHeaders = filterHeaders(req.headers)
    const body =
      req.method === 'GET' || req.method === 'HEAD'
        ? undefined
        : await req.text()

    const upstream = await fetch(target, {
      method: req.method,
      headers: incomingHeaders,
      body,
    })

    const respHeaders = filterHeaders(upstream.headers)
    const respBody = await upstream.arrayBuffer()

    return new NextResponse(respBody, {
      status: upstream.status,
      headers: respHeaders,
    })
  }

  return {
    GET: (req) => proxy(req),
    POST: (req) => proxy(req),
    PUT: (req) => proxy(req),
    PATCH: (req) => proxy(req),
    DELETE: (req) => proxy(req),
    OPTIONS: () => new NextResponse(null, { status: 204 }),
  }
}
