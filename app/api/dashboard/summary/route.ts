import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn('[API Proxy] GET /api/dashboard/summary: Unauthorized (Missing auth_token cookie)');
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL('/api/dashboard/summary', authUrl)

    console.log(`[API Proxy] GET /api/dashboard/summary -> Forwarding to: ${targetUrl.toString()}`);

    const upstream = await fetch(targetUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(15000),
    })

    console.log('[API Proxy] GET /api/dashboard/summary Response Status:', upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error('[API Proxy] GET /api/dashboard/summary Upstream Error Body:', errorBody);
      let detail = 'Failed to fetch dashboard summary'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    const data = await upstream.json()
    console.log('[API Proxy] GET /api/dashboard/summary loaded stats:', data.stats);
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error('[API Proxy] GET /api/dashboard/summary Exception:', message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
