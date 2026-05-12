# Admin Dashboard Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Vite dashboard into the Next.js app under `/admin` with proper App Router routing, a shared sidebar layout, and all nav items routed.

**Architecture:** Convert the Vite SPA sidebar + content pattern into Next.js App Router. A shared `admin/layout.tsx` wraps sidebar + header + main content. Client components handle animations (framer-motion) and sidebar state (collapsed/open).

**Tech Stack:** Next.js 16 (App Router), React 19, framer-motion, recharts, lucide-react, Tailwind CSS 4, shadcn-style UI components

---

## File Map

### New files to create

| Path | Purpose |
|------|---------|
| `app/admin/layout.tsx` | Shared layout: sidebar + header + main slot |
| `app/admin/page.tsx` | Main dashboard: stats + charts |
| `app/admin/attendance/page.tsx` | Attendance section stub |
| `app/admin/attendance/trend/page.tsx` | Trend & Analytics stub |
| `app/admin/attendance/breakdown/page.tsx` | Service Breakdown stub |
| `app/admin/attendance/checkin/page.tsx` | Check-In Activity stub |
| `app/admin/members/page.tsx` | Members section stub |
| `app/admin/members/insights/page.tsx` | Member Insights stub |
| `app/admin/members/manage/page.tsx` | Manage Members stub |
| `app/admin/visitors/page.tsx` | Visitors section stub |
| `app/admin/visitors/tracking/page.tsx` | Visitors Tracking stub |
| `app/admin/visitors/metrics/page.tsx` | First-Timer Metrics stub |
| `app/admin/followup/page.tsx` | Follow-Up section stub |
| `app/admin/followup/onboarding/page.tsx` | Onboarding stub |
| `app/admin/reports/page.tsx` | Reports stub |
| `app/admin/administration/page.tsx` | Administration section stub |
| `app/admin/administration/add-edit/page.tsx` | Add/Edit Members stub |
| `app/admin/administration/departments/page.tsx` | Assign Departments stub |
| `app/admin/administration/delete/page.tsx` | Delete Member stub |
| `components/admin/layout/Sidebar.tsx` | Sidebar with Next.js routing |
| `components/admin/layout/SidebarItem.tsx` | Sidebar nav item |
| `components/admin/layout/SidebarGroup.tsx` | Collapsible sidebar group |
| `components/admin/layout/HeaderBar.tsx` | Top header bar |
| `components/admin/dashboard/StatCard.tsx` | Stats card component |
| `components/admin/dashboard/StatsRow.tsx` | Stats row container |
| `components/admin/dashboard/AttendanceChart.tsx` | Attendance area chart |
| `components/admin/dashboard/MonthlyOverviewChart.tsx` | Monthly bar chart |
| `components/admin/dashboard/YearComparisonChart.tsx` | Year comparison chart |
| `components/admin/data/dashboardData.ts` | Mock data |
| `components/admin/types/index.ts` | TypeScript types |
| `components/admin/hooks/useCountUp.ts` | Count-up animation hook |
| `components/admin/contexts/SidebarContext.tsx` | Shared sidebar state |
| `components/ui/*` | 45 shadcn-style UI components |
| `app/admin/globals-admin.css` | Admin-specific styles |
| `public/avatar.jpg` | Copy from dashboard/public |

### Existing files to modify

| File | Change |
|------|--------|
| `app/globals.css` | Add admin sidebar color tokens to `:root` / `@theme` |
| `package.json` | Add `recharts` dependency |
| `app/tsconfig.app.json` | Verify `@/*` alias points to `src/*` |

---

## Step 0: Dependencies & Setup

- [ ] **Step 0.1: Add recharts to package.json**

Modify `package.json` — add `"recharts": "^2.15.4"` to dependencies. Run `npm install` in the `the-votage-web` root.

- [ ] **Step 0.2: Verify @ alias in tsconfig.app.json**

Read `app/tsconfig.app.json`. Confirm `baseUrl: "."` and `"@/*": ["./src/*"]` — existing `@/components` and `@/app` imports in the codebase confirm this already works. No change needed if correct.

- [ ] **Step 0.3: Create directory structure**

Create these empty directories to set up the structure:
```
app/admin/attendance/{trend,breakdown,checkin}
app/admin/members/{insights,manage}
app/admin/visitors/{tracking,metrics}
app/admin/followup/onboarding
app/admin/administration/{add-edit,departments,delete}
components/admin/{layout,dashboard,data,types,hooks,contexts}
app/admin/
```

---

## Step 1: Admin Globals & Theme

- [ ] **Step 1.1: Add admin sidebar color tokens to globals.css**

Append admin sidebar tokens to the existing `app/globals.css` inside the `:root` block or create a new `app/admin/globals-admin.css`. Add to the `@theme inline` block:

```css
/* Admin sidebar colors */
--color-sidebar-bg: #1A1D29;
--color-sidebar-text: #ffffff;
--color-sidebar-text-muted: rgba(255, 255, 255, 0.7);
--color-sidebar-hover: rgba(255, 255, 255, 0.1);
--color-sidebar-active: #ffffff;
--color-sidebar-border: rgba(255, 255, 255, 0.1);
```

- [ ] **Step 1.2: Create app/admin/globals-admin.css**

Create the file with the full admin-specific styles extracted from the Vite `index.css`:
- `--font-sans` from Poppins
- Admin sidebar background, text, hover tokens
- Import `tailwindcss`

```css
@import "tailwindcss";

@theme inline {
  --color-sidebar-bg: #1A1D29;
  --color-sidebar-text: #ffffff;
  --color-sidebar-text-muted: rgba(255, 255, 255, 0.7);
  --color-sidebar-hover: rgba(255, 255, 255, 0.1);
  --color-sidebar-active: #ffffff;
  --color-sidebar-border: rgba(255, 255, 255, 0.1);
}
```

- [ ] **Step 1.3: Copy avatar image**

Copy `dashboard/public/avatar.jpg` → `app/public/avatar.jpg` (or `public/avatar.jpg` relative to project root). Next.js serves `public/` files at `/`.

---

## Step 2: Core Types, Data, Utils, Hooks

- [ ] **Step 2.1: Create components/admin/types/index.ts**

Copy all types from `dashboard/src/types/index.ts` exactly as-is:
- `NavItem`, `NavGroup`, `StatCardData`, `AttendanceDataPoint`, `MonthlyData`, `ComparisonSeries`, `ComparisonData`

- [ ] **Step 2.2: Create components/admin/data/dashboardData.ts**

Copy all data from `dashboard/src/data/dashboardData.ts` — `statCardsData`, `attendanceData`, `monthlyData`, `comparisonData` — exactly as-is.

- [ ] **Step 2.3: Create components/admin/hooks/useCountUp.ts**

Copy from `dashboard/src/hooks/useCountUp.ts` exactly as-is.

- [ ] **Step 2.4: Create components/admin/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This file already exists at `lib/utils.ts` in the project root — you can re-export from there instead:
```typescript
export { cn } from "@/lib/utils"
```

---

## Step 3: UI Components

- [ ] **Step 3.1: Copy all shadcn-style UI components**

Copy all files from `dashboard/src/components/ui/` into `components/ui/` (the existing `components/ui/` in the app). Review each file — most should be identical or nearly identical. The key components needed are:

| Priority | Files |
|----------|-------|
| Required | `avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `chart.tsx` |
| Required | `sidebar.tsx`, `sheet.tsx`, `separator.tsx` (if present) |
| Spare | All others from `dashboard/src/components/ui/` — copy as-is |

Check the existing `components/ui/` in the app — most of these already exist (confirmed from glob). Compare and update any missing or outdated ones from the dashboard folder.

**Note:** The `chart.tsx` from dashboard should be reviewed — it likely wraps recharts for shadcn. If the existing app doesn't have one, copy it over.

---

## Step 4: Admin Layout Components

- [ ] **Step 4.1: Create components/admin/contexts/SidebarContext.tsx**

```typescript
'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface SidebarContextValue {
  collapsed: boolean
  mobileOpen: boolean
  toggleCollapse: () => void
  toggleMobile: () => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapse = useCallback(() => setCollapsed(c => !c), [])
  const toggleMobile = useCallback(() => setMobileOpen(o => !o), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <SidebarContext.Provider value={{ collapsed, mobileOpen, toggleCollapse, toggleMobile, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
```

- [ ] **Step 4.2: Create components/admin/layout/SidebarItem.tsx**

Copy from `dashboard/src/components/layout/SidebarItem.tsx` exactly as-is. Uses `cn` from `utils.ts`.

- [ ] **Step 4.3: Create components/admin/layout/SidebarGroup.tsx**

Copy from `dashboard/src/components/layout/SidebarGroup.tsx` exactly as-is.

- [ ] **Step 4.4: Create components/admin/layout/Sidebar.tsx**

Adapt `dashboard/src/components/layout/Sidebar.tsx`:
1. Import `SidebarItem` and `SidebarGroup` from the local `../` path (not `@/`)
2. Change all `setActiveItem(...)` calls to use `next/navigation`'s `usePathname()` hook instead — sidebar items highlight based on current route
3. Wrap all nav items in `<Link>` components pointing to their respective routes:
   - `LayoutDashboard` → `<Link href="/admin">`
   - Attendance group items → `/admin/attendance/trend`, `/admin/attendance/breakdown`, `/admin/attendance/checkin`
   - Members group items → `/admin/members/insights`, `/admin/members/manage`
   - Visitors group items → `/admin/visitors/tracking`, `/admin/visitors/metrics`
   - Follow-Up items → `/admin/followup/onboarding`
   - Reports → `/admin/reports`
   - Administration items → `/admin/administration/add-edit`, `/admin/administration/departments`, `/admin/administration/delete`
4. Import `useSidebar()` from context to get `collapsed` and `onToggleCollapse`
5. Change the mobile sidebar to use `onClose` from context

Key pattern: `active` state becomes `pathname.includes(href)`.

- [ ] **Step 4.5: Create components/admin/layout/HeaderBar.tsx**

Copy from `dashboard/src/components/layout/HeaderBar.tsx` exactly as-is, but:
1. Import `useSidebar()` from context to get `toggleMobile` for menu button
2. Replace hardcoded "Emma" with a placeholder like "Admin" or an empty div for now

---

## Step 5: Dashboard Components

- [ ] **Step 5.1: Create components/admin/dashboard/StatCard.tsx**

Copy from `dashboard/src/components/dashboard/StatCard.tsx` exactly as-is. Imports `useCountUp` from `../../hooks/useCountUp` and `cn` from `../../lib/utils`.

- [ ] **Step 5.2: Create components/admin/dashboard/StatsRow.tsx**

Copy from `dashboard/src/components/dashboard/StatsRow.tsx` exactly as-is. Imports `StatCardData` from `../../types/index` and `StatCard`.

- [ ] **Step 5.3: Create components/admin/dashboard/AttendanceChart.tsx**

Copy from `dashboard/src/components/dashboard/AttendanceChart.tsx` exactly as-is. Import paths need to be updated to relative:
- `AttendanceDataPoint` → `../../types/index`
- `cn` → `../../lib/utils`

- [ ] **Step 5.4: Create components/admin/dashboard/MonthlyOverviewChart.tsx**

Copy from `dashboard/src/components/dashboard/MonthlyOverviewChart.tsx` exactly as-is. Same path updates as above.

- [ ] **Step 5.5: Create components/admin/dashboard/YearComparisonChart.tsx**

Read the file from `dashboard/src/components/dashboard/YearComparisonChart.tsx` and copy it with updated relative imports.

---

## Step 6: Admin Route Pages

- [ ] **Step 6.1: Create app/admin/layout.tsx**

```typescript
'use client'

import { SidebarProvider, useSidebar } from '@/components/admin/contexts/SidebarContext'
import { Sidebar } from '@/components/admin/layout/Sidebar'
import { HeaderBar } from '@/components/admin/layout/HeaderBar'
import '@/app/admin/globals-admin.css'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function AdminShell({ children }: { children: React.ReactNode }) {
  const { collapsed, mobileOpen, closeMobile } = useSidebar()

  return (
    <div className="flex min-h-screen bg-[#F0F2F5]">
      <Sidebar />
      <main
        className={[
          'flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out',
          'lg:ml-[260px]',
          collapsed ? 'lg:ml-[72px]' : '',
        ].join(' ')}
      >
        <HeaderBar />
        <div className="flex-1 p-4 lg:p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminShell>{children}</AdminShell>
    </SidebarProvider>
  )
}
```

- [ ] **Step 6.2: Create app/admin/page.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { useSidebar } from '@/components/admin/contexts/SidebarContext'
import { StatsRow } from '@/components/admin/dashboard/StatsRow'
import { AttendanceChart } from '@/components/admin/dashboard/AttendanceChart'
import { MonthlyOverviewChart } from '@/components/admin/dashboard/MonthlyOverviewChart'
import { YearComparisonChart } from '@/components/admin/dashboard/YearComparisonChart'
import { statCardsData, attendanceData, monthlyData, comparisonData } from '@/components/admin/data/dashboardData'

export default function AdminDashboardPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h2 className="text-xl font-semibold text-[#111827]">Welcome back, Admin!</h2>
        <p className="text-sm text-[#6B7280] mt-1">
          Today: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </motion.div>

      <StatsRow data={statCardsData} />

      <AttendanceChart data={attendanceData} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <MonthlyOverviewChart data={monthlyData} />
        </div>
        <div className="lg:col-span-2">
          <YearComparisonChart data={comparisonData} />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 6.3: Create stub pages**

Create each stub page as a minimal component:
```typescript
// Example: app/admin/attendance/trend/page.tsx
export default function AttendanceTrendPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#111827]">Trend & Analytics</h1>
      <p className="text-[#6B7280]">Coming soon.</p>
    </div>
  )
}
```

Create stub pages for all these routes:
- `app/admin/attendance/page.tsx` — section index (redirect to trend or show overview)
- `app/admin/attendance/trend/page.tsx`
- `app/admin/attendance/breakdown/page.tsx`
- `app/admin/attendance/checkin/page.tsx`
- `app/admin/members/page.tsx` — section index
- `app/admin/members/insights/page.tsx`
- `app/admin/members/manage/page.tsx`
- `app/admin/visitors/page.tsx` — section index
- `app/admin/visitors/tracking/page.tsx`
- `app/admin/visitors/metrics/page.tsx`
- `app/admin/followup/page.tsx` — section index
- `app/admin/followup/onboarding/page.tsx`
- `app/admin/reports/page.tsx`
- `app/admin/administration/page.tsx` — section index
- `app/admin/administration/add-edit/page.tsx`
- `app/admin/administration/departments/page.tsx`
- `app/admin/administration/delete/page.tsx`

---

## Step 7: Verify

- [ ] **Step 7.1: Run lint**

```bash
npm run lint
```

- [ ] **Step 7.2: Run build (or typecheck)**

```bash
npm run build
```

Or at minimum, run TypeScript check:
```bash
npx tsc --noEmit
```

Expected: build succeeds with no errors. Fix any type errors or import path issues.

- [ ] **Step 7.3: Manual route verification**

Start the dev server and verify these routes load:
- `/admin` — main dashboard with stats + charts
- `/admin/attendance/trend` — stub page
- `/admin/members/insights` — stub page
- Mobile: `/admin` with hamburger menu working
