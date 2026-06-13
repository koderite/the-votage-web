import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'

    const body = new URLSearchParams()
    body.append('username', username)
    body.append('password', password)
    body.append('grant_type', 'password')

    const upstream = await fetch(`${authUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(15000),
    })

    if (!upstream.ok) {
      const errorBody = await upstream.text()
      let detail = 'Invalid credentials'
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
    const token = data.access_token

    const meRes = await fetch(`${authUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    })
    const user = meRes.ok ? await meRes.json() : null

    const response = NextResponse.json({ user })

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Authentication service unavailable'
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
