import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth.config'
import { redirect } from 'next/navigation'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export async function getSession() {
  return getServerSession(authOptions)
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const userEmail = session.user?.email?.toLowerCase()

  if (ADMIN_EMAILS.length > 0 && userEmail && !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/')
  }

  return session
}

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  if (!session) return false

  const userEmail = session.user?.email?.toLowerCase()
  return userEmail ? ADMIN_EMAILS.includes(userEmail) : false
}