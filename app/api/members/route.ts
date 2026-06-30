import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn('[API Proxy] GET /api/members: Unauthorized (Missing auth_token cookie)');
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL('/api/members/', authUrl)
    targetUrl.search = req.nextUrl.search

    console.log(`[API Proxy] GET ${req.nextUrl.pathname}${req.nextUrl.search} -> Forwarding to: ${targetUrl.toString()}`);

    const upstream = await fetch(targetUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    })

    console.log(`[API Proxy] GET ${targetUrl.pathname} Response Status:`, upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error('[API Proxy] GET Upstream Error Body:', errorBody);
      let detail = 'Failed to fetch members'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    const data = await upstream.json()
    console.log('[API Proxy] GET successfully fetched members count:', data.count || (data.results?.length || 0));
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Authentication service unavailable'
    console.error('[API Proxy] GET Exception:', message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn('[API Proxy] POST /api/members: Unauthorized (Missing auth_token cookie)');
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL('/api/members/', authUrl)
    const body = await req.json()

    console.log(`[API Proxy] POST /api/members -> Forwarding to: ${targetUrl.toString()} with body:`, body);

    const upstream = await fetch(targetUrl.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    })

    console.log('[API Proxy] POST Response Status:', upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error('[API Proxy] POST Upstream Error Body:', errorBody);
      let detail = 'Failed to create member'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    const data = await upstream.json()
    console.log('[API Proxy] POST created member successfully:', data);
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error('[API Proxy] POST Exception:', message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
