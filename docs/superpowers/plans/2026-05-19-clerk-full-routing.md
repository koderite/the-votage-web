# Full Clerk Routing Implementation Plan

> ⚠️ **DEPRECATED/ARCHIVED** - This document describes an alternative Clerk-based approach that was **rejected in favor of NextAuth**. See [NextAuth Migration](./2026-05-19-nextauth-migration.md) for the active implementation.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace custom login page with full Clerk routing including sign-in, sign-up, SignOutButton, and UserButton while retaining email whitelist protection.

**Architecture:** Use Clerk's built-in page routing instead of component mounting. Create dedicated sign-in/sign-up routes, update HeaderBar to use Clerk components, and update middleware to recognize new public routes.

**Tech Stack:** Next.js 16, @clerk/nextjs, Clerk components (SignIn, SignUp, SignOutButton, UserButton)

---

## File Structure

```
app/
├── sign-in/[[...sign-in]]/page.tsx    (NEW - Clerk sign-in page)
├── sign-up/[[...sign-up]]/page.tsx    (NEW - Clerk sign-up page)
├── admin/login/page.tsx               (MODIFY - redirect to sign-in)
components/admin/layout/
└── HeaderBar.tsx                      (MODIFY - use Clerk components)
proxy.ts                               (MODIFY - add new public routes)
```

---

## Tasks

### Task 1: Create Clerk Sign-In Page

**Files:**
- Create: `app/sign-in/[[...sign-in]]/page.tsx`

- [ ] **Step 1: Create sign-in page directory and file**

```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'bg-[#FF6B35] hover:bg-[#E85A2A] text-white',
          card: 'shadow-none border border-gray-200',
        }
      }}
      signInUrl="/sign-in"
      afterSignInUrl="/admin/dashboard"
      routing="path"
      path="/sign-in"
    />
  )
}
```

- [ ] **Step 2: Verify file created**

Run: `Test-Path "app/sign-in/[[...sign-in]]/page.tsx"`
Expected: True

- [ ] **Step 3: Commit**

```bash
git add app/sign-in/[[...sign-in]]/page.tsx
git commit -m "feat: add Clerk sign-in page"
```

---

### Task 2: Create Clerk Sign-Up Page

**Files:**
- Create: `app/sign-up/[[...sign-up]]/page.tsx`

- [ ] **Step 1: Create sign-up page directory and file**

```tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: 'bg-[#FF6B35] hover:bg-[#E85A2A] text-white',
          card: 'shadow-none border border-gray-200',
        }
      }}
      signUpUrl="/sign-up"
      afterSignUpUrl="/admin/dashboard"
      routing="path"
      path="/sign-up"
    />
  )
}
```

- [ ] **Step 2: Verify file created**

Run: `Test-Path "app/sign-up/[[...sign-up]]/page.tsx"`
Expected: True

- [ ] **Step 3: Commit**

```bash
git add app/sign-up/[[...sign-up]]/page.tsx
git commit -m "feat: add Clerk sign-up page"
```

---

### Task 3: Update Admin Login Page to Redirect

**Files:**
- Modify: `app/admin/login/page.tsx:1-79`

- [ ] **Step 1: Read current file**

Read: `app/admin/login/page.tsx`

- [ ] **Step 2: Replace with redirect component**

```tsx
import { redirect } from 'next/navigation'

export default function AdminLoginPage() {
  redirect('/sign-in')
}
```

- [ ] **Step 3: Verify page still works**

Run: Dev server and visit `/admin/login` → should redirect to `/sign-in`

- [ ] **Step 4: Commit**

```bash
git add app/admin/login/page.tsx
git commit -m "refactor: redirect admin/login to Clerk sign-in"
```

---

### Task 4: Update HeaderBar with Clerk Components

**Files:**
- Modify: `components/admin/layout/HeaderBar.tsx:1-109`

- [ ] **Step 1: Read current file**

Read: `components/admin/layout/HeaderBar.tsx`

- [ ] **Step 2: Replace imports**

Old:
```tsx
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Bell, Menu, Settings, LogOut, User as UserIcon, X } from 'lucide-react'
```

New:
```tsx
import { SignOutButton, UserButton } from '@clerk/nextjs'
import { Bell, Menu, Settings } from 'lucide-react'
import { useSidebar } from '../contexts/SidebarContext'
```

- [ ] **Step 3: Replace component content**

Remove hooks: `useAuth`, `useUser`, `useRouter`, `useState`, `useRef`, `useEffect`
Remove: `menuOpen`, `menuRef`, `handleClickOutside`, `handleSignOut`, `userName`, `userImage`, `userEmail`

Replace user section (lines 69-105):
```tsx
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

          <SignOutButton signOutUrl="/admin/login">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut size={20} className="text-[#6B7280]" />
            </button>
          </SignOutButton>

          <UserButton
            afterSignOutUrl="/admin/login"
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8'
              }
            }}
          />
        </div>
```

- [ ] **Step 4: Remove unused imports**

Verify `LogOut` is still imported (used in SignOutButton), remove if unused

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add components/admin/layout/HeaderBar.tsx
git commit -m "refactor: use Clerk SignOutButton and UserButton"
```

---

### Task 5: Update Middleware with New Public Routes

**Files:**
- Modify: `proxy.ts:17`

- [ ] **Step 1: Read current file**

Read: `proxy.ts`

- [ ] **Step 2: Update isPublicRoute**

Old (line 17):
```ts
const isPublicRoute = createRouteMatcher(['/admin/login(.*)', '/api/(.*)'])
```

New:
```ts
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/(.*)'
])
```

- [ ] **Step 3: Verify middleware works**

Run: Build and test accessing `/admin/dashboard` without auth → should redirect to `/sign-in`

- [ ] **Step 4: Commit**

```bash
git add proxy.ts
git commit -m "feat: add Clerk routes to public routes in middleware"
```

---

### Task 6: Update Root Layout ClerkProvider

**Files:**
- Modify: `app/layout.tsx:64-73`

- [ ] **Step 1: Read current file**

Read: `app/layout.tsx`

- [ ] **Step 2: Update ClerkProvider URLs**

Old:
```tsx
<ClerkProvider
  dynamic
  signInUrl="/admin/login"
  signUpUrl="/admin/login"
  afterSignInUrl="/admin/dashboard"
  afterSignOutUrl="/admin/login"
>
```

New:
```tsx
<ClerkProvider
  dynamic
  signInUrl="/sign-in"
  signUpUrl="/sign-up"
  afterSignInUrl="/admin/dashboard"
  afterSignOutUrl="/sign-in"
>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor: update ClerkProvider redirect URLs"
```

---

## Verification Steps

After all tasks complete:

1. Visit `/sign-in` → should show Clerk sign-in form
2. Visit `/sign-up` → should show Clerk sign-up form
3. Visit `/admin/dashboard` without auth → should redirect to sign-in
4. Sign in with whitelisted email → should redirect to `/admin/dashboard`
5. Sign in with non-whitelisted email → should redirect to `/` (handled by middleware)
6. Click user button in HeaderBar → should show Clerk user menu
7. Click sign out → should redirect to `/sign-in`

---

## Plan Complete

All tasks written and saved. Ready for execution.