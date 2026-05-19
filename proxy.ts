/**
 * Clerk Middleware
 * 
 * Auth is now handled server-side in admin layout via requireAdmin().
 * This middleware is kept minimal for Clerk's internal routes.
 */

import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(() => {
  // Auth handled in app/admin/layout.tsx
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
}