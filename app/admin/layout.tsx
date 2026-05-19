import { AdminProviders } from './AdminProviders'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect('/sign-in')
  }

  const userEmail = session.user?.email?.toLowerCase()
  if (ADMIN_EMAILS.length > 0 && userEmail && !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/')
  }

  return <AdminProviders>{children}</AdminProviders>
}