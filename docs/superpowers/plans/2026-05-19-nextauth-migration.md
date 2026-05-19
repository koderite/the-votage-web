# NextAuth Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Clerk authentication with NextAuth (GitHub + Google OAuth), retain email whitelist for admin access.

**Architecture:** Use NextAuth v4 with App Router, custom sign-in/sign-up pages, server-side session protection in layouts, client-side session hooks in components.

**Tech Stack:** Next.js 16, next-auth v4, OAuth (GitHub + Google)

---

## File Structure

```
app/
├── api/auth/[...nextauth]/route.ts   (NEW - NextAuth handler)
├── sign-in/page.tsx                  (NEW - Custom sign-in)
├── sign-up/page.tsx                  (NEW - Custom sign-up)
├── admin/layout.tsx                  (MODIFY - use NextAuth session)
├── layout.tsx                        (MODIFY - SessionProvider)
lib/
├── auth.ts                           (MODIFY - NextAuth functions)
├── auth.config.ts                   (NEW - NextAuth config)
components/
├── admin/layout/HeaderBar.tsx       (MODIFY - useSession hooks)
├── auth/SignOutButton.tsx           (NEW - Custom sign out)
env.local                            (ADD - NextAuth vars)
```

---

## Tasks

### Task 1: Install NextAuth and Update Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add next-auth to dependencies**

Run: `npm install next-auth`

- [ ] **Step 2: Verify installation**

Check: `package.json` should contain `"next-auth": "^4.x.x"`

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "feat: add next-auth package"
```

---

### Task 2: Create NextAuth API Route

**Files:**
- Create: `app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Create the auth API route**

Create file `app/api/auth/[...nextauth]/route.ts`:

```ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

- [ ] **Step 2: Verify file created**

Run: `Test-Path "app/api/auth/[...nextauth]/route.ts"`

- [ ] **Step 3: Commit**

```bash
git add app/api/auth/\[...nextauth\]/route.ts
git commit -m "feat: add NextAuth API route with GitHub and Google"
```

---

### Task 3: Create Session Provider Component

**Files:**
- Create: `components/Providers.tsx`

- [ ] **Step 1: Create the SessionProvider wrapper**

Create file `components/Providers.tsx`:

```tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Providers.tsx
git commit -m "feat: add SessionProvider component"
```

---

### Task 4: Update Root Layout to Use NextAuth

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Read current file**

Read: `app/layout.tsx`

- [ ] **Step 2: Replace ClerkProvider with SessionProvider**

Old (lines 4, 64-73):
```tsx
import { ClerkProvider } from "@clerk/nextjs";
...
<ClerkProvider
  dynamic
  signInUrl="/sign-in"
  signUpUrl="/sign-up"
  afterSignInUrl="/admin/dashboard"
  afterSignOutUrl="/sign-in"
>
  {children}
</ClerkProvider>
```

New:
```tsx
import { Providers } from "@/components/Providers";
...
<Providers>
  {children}
</Providers>
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor: replace ClerkProvider with SessionProvider"
```

---

### Task 5: Create Custom Sign-In Page

**Files:**
- Create: `app/sign-in/page.tsx`

- [ ] **Step 1: Create sign-in page**

Create file `app/sign-in/page.tsx`:

```tsx
'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/admin/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-copperplate-bold)' }}>
            Admin Login
          </h1>
          <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn('github', { callbackUrl: '/admin/dashboard' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <button
            onClick={() => signIn('google', { callbackUrl: '/admin/dashboard' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Only authorized users can access the admin dashboard.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sign-in/page.tsx
git commit -m "feat: create custom sign-in page"
```

---

### Task 6: Create Sign-Up Page

**Files:**
- Create: `app/sign-up/page.tsx`

- [ ] **Step 1: Create sign-up page**

Create file `app/sign-up/page.tsx`:

```tsx
'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/admin/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-copperplate-bold)' }}>
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">Sign up to access the admin dashboard</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn('github', { callbackUrl: '/admin/dashboard' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign up with GitHub
          </button>

          <button
            onClick={() => signIn('google', { callbackUrl: '/admin/dashboard' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <a href="/sign-in" className="text-[#FF6B35] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sign-up/page.tsx
git commit -m "feat: create sign-up page"
```

---

### Task 7: Update lib/auth.ts for NextAuth

**Files:**
- Modify: `lib/auth.ts`

- [ ] **Step 1: Read current file**

Read: `lib/auth.ts`

- [ ] **Step 2: Replace with NextAuth functions**

Replace entire file:

```ts
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth.config'
import { redirect } from 'next/navigation'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export async function getSession() {
  return getServerSession(authOptions)
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const userEmail = session.user?.email?.toLowerCase()

  if (ADMIN_EMAILS.length > 0 && userEmail && !ADMIN_EMAILS.includes(userEmail)) {
    redirect('/')
  }

  return session
}

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  if (!session) return false

  const userEmail = session.user?.email?.toLowerCase()
  return userEmail ? ADMIN_EMAILS.includes(userEmail) : false
}
```

- [ ] **Step 3: Create auth.config.ts**

Create file `lib/auth.config.ts`:

```ts
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
  },
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/auth.ts lib/auth.config.ts
git commit -m "refactor: update auth functions for NextAuth"
```

---

### Task 8: Update Admin Layout to Use NextAuth

**Files:**
- Modify: `app/admin/layout.tsx`

- [ ] **Step 1: Read current file**

Read: `app/admin/layout.tsx`

- [ ] **Step 2: Replace requireAdmin import**

Old:
```ts
import { requireAdmin } from '@/lib/auth'
```

New:
```ts
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)
```

- [ ] **Step 3: Replace admin layout content**

Old:
```ts
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return <AdminProviders>{children}</AdminProviders>
}
```

New:
```ts
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
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/layout.tsx
git commit -m "refactor: use NextAuth session in admin layout"
```

---

### Task 9: Update HeaderBar with NextAuth

**Files:**
- Modify: `components/admin/layout/HeaderBar.tsx`

- [ ] **Step 1: Read current file**

Read: `components/admin/layout/HeaderBar.tsx`

- [ ] **Step 2: Replace Clerk imports with NextAuth**

Old:
```tsx
import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/nextjs'
import { Bell, Menu, Settings, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '../contexts/SidebarContext'
```

New:
```tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { Bell, Menu, Settings, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '../contexts/SidebarContext'
import { useState, useRef, useEffect } from 'react'
```

- [ ] **Step 3: Add session hook and user menu**

Replace component content:

```tsx
export function HeaderBar() {
  const { data: session, status } = useSession()
  const { collapsed, toggleMobile, toggleCollapse } = useSidebar()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    await signOut({ callbackUrl: '/sign-in' })
  }

  const userName = session?.user?.name || session?.user?.email || 'User'
  const userImage = session?.user?.image

  if (status === 'loading') {
    return null
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        {collapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold text-[#111827]">DashBoard</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-[#6B7280]" />
          <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 hover:bg-red-500">
            1
          </Badge>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} className="text-[#6B7280]" />
        </button>

        <button
          onClick={handleSignOut}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={20} className="text-[#6B7280]" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {userImage ? (
              <img src={userImage} alt={userName} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-sm font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-[#111827]">{userName}</p>
                <p className="text-sm text-gray-500 truncate">{session?.user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[#DC2626] transition-colors"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/admin/layout/HeaderBar.tsx
git commit -m "refactor: update HeaderBar for NextAuth"
```

---

### Task 10: Clean Up Old Clerk Files

**Files:**
- Remove: Clerk-related files no longer needed

- [ ] **Step 1: Check for remaining Clerk imports**

Run: `rg "from '@clerk" --type tsx`

If any remain, remove them.

- [ ] **Step 2: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove remaining Clerk references"
```

---

## Verification Steps

1. Add environment variables to `.env.local`
2. Run `npm run dev`
3. Visit `/sign-in` - should show GitHub/Google buttons
4. Click sign in - should redirect to OAuth provider
5. After OAuth, redirect to `/admin/dashboard`
6. Click sign out - should redirect to `/sign-in`
7. Visit `/admin/dashboard` without auth - should redirect to `/sign-in`

---

## Plan Complete

All tasks written and saved. Ready for execution.