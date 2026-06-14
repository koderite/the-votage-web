import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { User } from '@/types'

const AUTH_BACKEND_URL = process.env.AUTH_BACKEND_URL || 'https://votage-backend.onrender.com'

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  if (!token) return null

  try {
    const res = await fetch(`${AUTH_BACKEND_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function requireAdmin(): Promise<User> {
  const user = await getSession()

  if (!user) {
    redirect('/sign-in')
  }

  if (!user.is_staff) {
    redirect('/')
  }

  return user
}

export async function isAdmin(): Promise<boolean> {
  const user = await getSession()
  return user?.is_staff === true
}
