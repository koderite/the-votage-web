import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn(`[API Proxy] GET /api/members/${id}: Unauthorized (Missing auth_token cookie)`);
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL(`/api/members/${id}`, authUrl)

    console.log(`[API Proxy] GET /api/members/${id} -> Forwarding to: ${targetUrl.toString()}`);

    const upstream = await fetch(targetUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(15000),
    })

    console.log(`[API Proxy] GET /api/members/${id} Upstream Status:`, upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error(`[API Proxy] GET /api/members/${id} Upstream Error:`, errorBody);
      let detail = 'Failed to fetch member'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    const data = await upstream.json()
    console.log(`[API Proxy] GET /api/members/${id} loaded:`, data);
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error(`[API Proxy] GET /api/members/${id} Exception:`, message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn(`[API Proxy] PATCH /api/members/${id}: Unauthorized (Missing auth_token cookie)`);
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL(`/api/members/${id}`, authUrl)
    const body = await req.json()

    console.log(`[API Proxy] PATCH /api/members/${id} -> Forwarding to: ${targetUrl.toString()} with body:`, body);

    const upstream = await fetch(targetUrl.toString(), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    })

    console.log(`[API Proxy] PATCH /api/members/${id} Upstream Status:`, upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error(`[API Proxy] PATCH /api/members/${id} Upstream Error:`, errorBody);
      let detail = 'Failed to update member'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    const data = await upstream.json()
    console.log(`[API Proxy] PATCH /api/members/${id} successfully updated:`, data);
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error(`[API Proxy] PATCH /api/members/${id} Exception:`, message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      console.warn(`[API Proxy] DELETE /api/members/${id}: Unauthorized (Missing auth_token cookie)`);
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
    }

    const authUrl = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'
    const targetUrl = new URL(`/api/members/${id}`, authUrl)

    console.log(`[API Proxy] DELETE /api/members/${id} -> Forwarding to: ${targetUrl.toString()}`);

    const upstream = await fetch(targetUrl.toString(), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(15000),
    })

    console.log(`[API Proxy] DELETE /api/members/${id} Upstream Status:`, upstream.status);

    if (!upstream.ok) {
      const errorBody = await upstream.text().catch(() => '')
      console.error(`[API Proxy] DELETE /api/members/${id} Upstream Error:`, errorBody);
      let detail = 'Failed to delete member'
      try {
        const parsed = JSON.parse(errorBody)
        if (parsed.detail) detail = typeof parsed.detail === 'string' ? parsed.detail : JSON.stringify(parsed.detail)
      } catch {}
      return NextResponse.json({ detail }, { status: upstream.status })
    }

    console.log(`[API Proxy] DELETE /api/members/${id} deleted successfully.`);
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Service unavailable'
    console.error(`[API Proxy] DELETE /api/members/${id} Exception:`, message);
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
