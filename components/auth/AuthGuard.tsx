'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/admin/login')
    } else if (isLoaded && isSignedIn && userEmail && !ADMIN_EMAILS.includes(userEmail)) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, userEmail, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  if (userEmail && !ADMIN_EMAILS.includes(userEmail)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Access Denied</h1>
          <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}