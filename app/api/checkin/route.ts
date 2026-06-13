import { createProxyRoute } from '@/lib/api-proxy'

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = createProxyRoute('/api/checkin')
