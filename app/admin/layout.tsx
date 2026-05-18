import { AdminProviders } from './AdminProviders'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

  // Get user info from session claims
  const { sessionClaims } = await auth()
  const userEmail = (sessionClaims?.email as string | undefined)?.toLowerCase()

  if (adminEmails.length > 0 && userEmail && !adminEmails.includes(userEmail)) {
    redirect('/')
  }

  return <AdminProviders>{children}</AdminProviders>
}