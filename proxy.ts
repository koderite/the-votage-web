/**
 * Clerk Middleware — Route Protection Layer
 * 
 * This file runs at the EDGE (before any page renders) on every request.
 * It handles authentication and authorization for the entire application.
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

/**
 * Route Definitions
 * 
 * isPublicRoute: Routes that don't require authentication.
 * - /admin/login: The sign-in page (must be public so unauthenticated users can access it)
 * - /api/*: All API routes (auth handled per-endpoint if needed)
 */
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin/login(.*)',
  '/api/(.*)'
])

/**
 * isAdminRoute: All routes under /admin/* path.
 * Used to apply admin-specific authorization checks.
 */
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

/**
 * ADMIN_EMAILS: Whitelist of emails allowed to access the admin dashboard.
 * 
 * Loaded from environment variable NEXT_PUBLIC_ADMIN_EMAILS (comma-separated).
 * Example: NEXT_PUBLIC_ADMIN_EMAILS="admin@church.com, pastor@church.com"
 * 
 * NOTE: This is a basic email-based access control. For production, consider
 * using Clerk's Roles & Permissions system for more robust admin authorization.
 */
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

/**
 * Middleware Handler
 * 
 * Executes on every request that matches the matcher patterns below.
 * The auth() object provides:
 * - auth().protect(): Redirects to sign-in if user is not authenticated
 * - auth().userId: The authenticated user's ID
 * - auth().sessionClaims: JWT claims including email, roles, etc.
 */
export default clerkMiddleware(async (auth, req) => {
  /**
   * STEP 1: Authentication Check
   * 
   * Only protect admin routes (except /admin/login which is public).
   * For all other routes (like /), no auth required.
   */
  if (isAdminRoute(req) && !isPublicRoute(req)) {
    await auth.protect()
  }

  /**
   * STEP 2: Admin Authorization Check
   * 
   * For all /admin/* routes (except /admin/login which is already public):
   * Check if the signed-in user's email is in the ADMIN_EMAILS whitelist.
   */
  if (isAdminRoute(req) && !isPublicRoute(req)) {
    const { userId, sessionClaims } = await auth()

    if (userId && ADMIN_EMAILS.length > 0) {
      const userEmail = (sessionClaims?.email as string | undefined)?.toLowerCase()

      if (userEmail && !ADMIN_EMAILS.includes(userEmail)) {
        return Response.redirect(new URL('/', req.url))
      }
    }
  }
})

/**
 * Matcher Configuration
 * 
 * Defines which routes this middleware should process.
 * 
 * Pattern breakdown:
 * - '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|...))': All static asset paths
 * - '/(api|trpc)(.*)': API and tRPC routes
 * - '/__clerk/(.*)': Clerk's own API routes (for auth state)
 */
export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
}