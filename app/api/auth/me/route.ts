import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value
  if (!token) {
    return NextResponse.json(null, { status: 401 })
  }

  const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'

  const upstream = await fetch(`${authUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!upstream.ok) {
    const response = NextResponse.json(null, { status: 401 })
    response.cookies.delete('auth_token')
    return response
  }

  const data = await upstream.json()
  return NextResponse.json(data)
}
