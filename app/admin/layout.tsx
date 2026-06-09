import { AdminProviders } from './AdminProviders'
import { requireAdmin } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return <AdminProviders>{children}</AdminProviders>
} 