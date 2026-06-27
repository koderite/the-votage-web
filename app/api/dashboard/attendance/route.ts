import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL('/api/dashboard/attendance', authUrl)
    
    // Forward all incoming search parameters (filters)
    targetUrl.search = req.nextUrl.search

    const upstream = await fetch(targetUrl.toString(), {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!upstream.ok) {
      const errorBody = await upstream.text()
      let detail = 'Failed to fetch dashboard attendance details'
      try {
        const parsed = JSON.parse(errorBody)
        if (typeof parsed.detail === 'string') {
          detail = parsed.detail
        } else if (Array.isArray(parsed.detail)) {
          detail = parsed.detail.map((d: any) => d.msg).join(', ')
        }
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    const data = await upstream.json()
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Dashboard service unavailable'
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
