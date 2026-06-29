import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'

    const headers: Record<string, string> = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('page_size') || '10'

    const upstream = await fetch(`${authUrl}/api/members/?page=${page}&page_size=${pageSize}`, {
      headers,
      signal: AbortSignal.timeout(15000),
    })

    if (!upstream.ok) {
      return NextResponse.json({ detail: 'Failed to fetch members' }, { status: upstream.status })
    }

    const data = await upstream.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ detail: 'Bad Gateway' }, { status: 502 })
  }
}
