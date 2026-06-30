import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn('[API Proxy] GET /api/home/stats: Unauthorized (Missing auth_token cookie)');
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL('/api/home/stats', authUrl)

    console.log(`[API Proxy] GET /api/home/stats -> Forwarding to: ${targetUrl.toString()}`);

    const upstream = await fetch(targetUrl.toString(), {
      signal: AbortSignal.timeout(15000),
    })

    console.log('[API Proxy] GET /api/home/stats Response Status:', upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error('[API Proxy] GET /api/home/stats Upstream Error Body:', errorBody);
      return NextResponse.json({ detail: 'Failed to fetch home stats' }, { status: upstream.status })
    }

    const data = await upstream.json()
    console.log('[API Proxy] GET /api/home/stats loaded data successfully');
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error('[API Proxy] GET /api/home/stats Exception:', message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
