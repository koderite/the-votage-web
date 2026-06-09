import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
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

  const response = NextResponse.json({ success: true })

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}
