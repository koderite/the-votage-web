# Admin Dashboard Authentication Layer Design

> ⚠️ **DEPRECATED/ARCHIVED** - This spec describes the legacy Clerk-based approach. The active implementation uses NextAuth - see [NextAuth Migration Plan](../plans/2026-05-19-nextauth-migration.md).

**Date:** 2026-05-17
**Status:** Superseded

## Overview

Implement authentication layer for the admin dashboard using Clerk with a custom login UI that matches the project's design system. All admin routes require authentication.

## Architecture

```
app/
├── admin/
│   ├── layout.tsx          # Auth guard - validates session
│   ├── login/
│   │   └── page.tsx       # Custom sign-in page
│   └── ...protected routes
├── components/
│   └── auth/
│       └── ClerkProvider.tsx
├── routes.tsx              # Add /admin/login route
└── main.tsx                # Wrap with ClerkProvider
```

## Approach

- **Custom UI with Clerk** - Build custom login page using Clerk's React components styled to match existing design system
- **All routes protected** - Any unauthenticated access to `/admin/*` redirects to `/admin/login`

## Components

### 1. ClerkProvider.tsx
- Wraps application with Clerk context
- Provides `useAuth` hook throughout app

### 2. admin/layout.tsx (Auth Guard)
- Uses `useAuth()` to check session status
- If not signed in, redirects to `/admin/login`
- If signed in, renders protected content

### 3. admin/login/page.tsx
- Custom sign-in page
- Uses Clerk's `<SignIn />` component
- Styled to match design system

## Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Note: Clerk supports non-Next.js frameworks (Vite/React Router) via `@clerk/react-router`.

## Data Flow

1. User visits `/admin/dashboard`
2. `layout.tsx` checks `useAuth().isSignedIn`
3. If false → redirect to `/admin/login`
4. User enters credentials on custom login page
5. On success → redirect to `/admin/dashboard`
6. Session persists via Clerk's cookie-based auth

## Error Handling

- Invalid credentials: Clerk returns error, display inline
- Session expired: Redirect to login
- Network error: Show retry option

## Acceptance Criteria

1. Unauthenticated users cannot access any `/admin/*` route
2. Login page uses custom UI matching design system
3. Successful login redirects to dashboard
4. Logout clears session and redirects to login
5. Protected routes show loading state while checking auth

## Implementation Notes

- Install `@clerk/react-router` package
- Configure `ClerkBrowser` for Vite/React Router setup
- Add logout button to HeaderBar component