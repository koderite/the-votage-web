import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn('[API Proxy] GET /api/dashboard/report/attendance: Unauthorized (Missing auth_token cookie)');
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL('/api/dashboard/report/attendance', authUrl)

    console.log(`[API Proxy] GET /api/dashboard/report/attendance -> Forwarding to: ${targetUrl.toString()}`);

    const upstream = await fetch(targetUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(30000), // Downloads can take a bit longer
    })

    console.log('[API Proxy] GET /api/dashboard/report/attendance Response Status:', upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error('[API Proxy] GET /api/dashboard/report/attendance Upstream Error Body:', errorBody);
      let detail = 'Failed to fetch attendance report'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    // Forward the file stream with the appropriate headers
    const headers = new Headers()
    const contentDisposition = upstream.headers.get('content-disposition')
    const contentType = upstream.headers.get('content-type')
    const contentLength = upstream.headers.get('content-length')

    if (contentDisposition) {
      headers.set('content-disposition', contentDisposition)
    } else {
      headers.set('content-disposition', 'attachment; filename=attendance_monthly.csv')
    }

    if (contentType) {
      headers.set('content-type', contentType)
    } else {
      headers.set('content-type', 'text/csv; charset=utf-8')
    }

    if (contentLength) {
      headers.set('content-length', contentLength)
    }

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error('[API Proxy] GET /api/dashboard/report/attendance Exception:', message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
