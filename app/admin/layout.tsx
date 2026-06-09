import { AdminProviders } from './AdminProviders'
import { requireAdmin } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    await requireAdmin()
  }

  return <AdminProviders>{children}</AdminProviders>
} 