import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  if (ADMIN_EMAILS.length > 0) {
    const userEmail = (sessionClaims?.email as string | undefined)?.toLowerCase()
    if (userEmail && !ADMIN_EMAILS.includes(userEmail)) {
      redirect('/')
    }
  }

  return { userId }
}

export function isAdmin(): boolean {
  return true
}