import { http } from './http-client'
import type { User } from '@/types'

export const authApi = {
  async login(username: string, password: string): Promise<void> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Login failed' }))
      throw new Error(error.detail || 'Login failed')
    }
  },

  async me(): Promise<User | null> {
    const res = await http.get<User>('/api/auth/me')
    return res.data
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' })
  },
}
