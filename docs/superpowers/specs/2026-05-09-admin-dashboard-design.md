# Admin Dashboard Integration Design

## Context

The `dashboard/` folder is a standalone Vite + React app containing a fully-styled admin dashboard with sidebar navigation, charts, and stat cards. The goal is to integrate this into the existing Next.js app (`the-votage-web`) under the `/admin` route, with proper App Router structure.

---

## Route Structure

All routes live under `app/admin/`.

| URL | Page | Description |
|-----|------|-------------|
| `/admin` | `page.tsx` | Overview: stats row + charts |
| `/admin/attendance` | `page.tsx` | Attendance section index |
| `/admin/attendance/trend` | `page.tsx` | Trend & Analytics |
| `/admin/attendance/breakdown` | `page.tsx` | Service Breakdown |
| `/admin/attendance/checkin` | `page.tsx` | Check-In Activity |
| `/admin/members` | `page.tsx` | Members section index |
| `/admin/members/insights` | `page.tsx` | Member Insights |
| `/admin/members/manage` | `page.tsx` | Manage Members |
| `/admin/visitors` | `page.tsx` | Visitors section index |
| `/admin/visitors/tracking` | `page.tsx` | Visitors Tracking |
| `/admin/visitors/metrics` | `page.tsx` | First-Timer Metrics |
| `/admin/followup` | `page.tsx` | Follow-Up section |
| `/admin/followup/onboarding` | `page.tsx` | Onboarding |
| `/admin/reports` | `page.tsx` | Reports |
| `/admin/administration` | `page.tsx` | Administration section |
| `/admin/administration/add-edit` | `page.tsx` | Add/Edit Members |
| `/admin/administration/departments` | `page.tsx` | Assign Departments |
| `/admin/administration/delete` | `page.tsx` | Delete a Member |

---

## File & Directory Plan

```
app/admin/
  layout.tsx          ← sidebar + header wrapper (sticky sidebar)
  page.tsx            ← overview dashboard (stats + charts)

  attendance/
    page.tsx         ← redirects or shows section index
    trend/page.tsx
    breakdown/page.tsx
    checkin/page.tsx

  members/
    page.tsx
    insights/page.tsx
    manage/page.tsx

  visitors/
    page.tsx
    tracking/page.tsx
    metrics/page.tsx

  followup/
    page.tsx
    onboarding/page.tsx

  reports/page.tsx

  administration/
    page.tsx
    add-edit/page.tsx
    departments/page.tsx
    delete/page.tsx

components/admin/
  layout/
    Sidebar.tsx
    SidebarItem.tsx
    SidebarGroup.tsx
    HeaderBar.tsx
  dashboard/
    StatCard.tsx
    StatsRow.tsx
    AttendanceChart.tsx
    MonthlyOverviewChart.tsx
    YearComparisonChart.tsx
  data/
    dashboardData.ts
  types/
    index.ts
  hooks/
    useCountUp.ts

components/ui/         ← copy from dashboard/src/components/ui (shadcn-style)
```

---

## Layout Pattern

### `app/admin/layout.tsx`
- Renders `<Sidebar>` + `<HeaderBar>` + `<main>` slot
- Sidebar is **fixed/sticky** on desktop, **drawer** on mobile
- Main content area uses `margin-left` (or `ml` in Tailwind) that matches sidebar width — same pattern as the original Vite app, but wrapped in a Next.js layout
- Sidebar state (collapsed/expanded) managed via React Context or URL search params (shared across all admin pages)

### `app/admin/page.tsx`
- Wraps stats + charts in the same structure as original `App.tsx`
- Uses `'use client'` directive since it uses `framer-motion` and hooks

---

## Migration Notes

1. **Convert Vite → Next.js patterns:**
   - `@/` alias → relative imports or Next.js `~` alias configured in `tsconfig.json`
   - `framer-motion` works as-is
   - `recharts` works as-is
   - Copy `components/ui/` from dashboard as-is — shadcn-style

2. **Sidebar state:** Use a React Context (`SidebarContext`) to share collapsed state between layout and pages, or persist to `localStorage`

3. **Styling:** Copy `tailwind.config.js` settings from dashboard if custom colors/fonts are used. Confirm whether the existing Next.js app's `globals.css` conflicts with dashboard's `index.css` — likely need to copy dashboard styles or merge tokens

4. **Fonts/Icons:** `lucide-react` already in package.json — no changes needed

5. **Data:** Keep `dashboardData.ts` in `components/admin/data/` and adapt types to match

6. **Types:** Copy `dashboard/src/types/index.ts` to `components/admin/types/`

7. **Auth placeholder:** Pages will be publicly accessible for now — auth is out of scope for this spec

8. **Stub pages:** All non-dashboard pages (`trend`, `breakdown`, `insights`, etc.) should be simple stub pages with a section header + "Coming soon" placeholder until real functionality is built

---

## Tech Stack (unchanged)

- Next.js (App Router) — already in use
- React 19 + framer-motion — already in use
- Recharts — **needs to be added** to `package.json`
- Tailwind CSS 4 — already in use
- shadcn-style UI components — copy from dashboard
- lucide-react — already in use

---

## Implementation Order

1. Copy `components/ui/` from dashboard to project
2. Copy `components/admin/types/`, `data/`, `hooks/`
3. Copy + adapt `Sidebar`, `HeaderBar`, `SidebarItem`, `SidebarGroup`
4. Create `app/admin/layout.tsx` with sidebar context
5. Create `app/admin/page.tsx` (main dashboard)
6. Create stub pages for all sub-routes
7. Verify build + routing
