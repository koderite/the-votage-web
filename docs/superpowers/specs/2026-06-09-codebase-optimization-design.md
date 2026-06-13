# Codebase Optimization — Design Spec

## Objective

Optimize the codebase for best practices, design patterns, and reusability across six
categories: API layer, code organization, type safety, form patterns, error handling,
and dead code cleanup.

## Approach: Phased by Dependency

Three phases executed sequentially. Each phase is independently testable and builds on
the foundation of the previous one.

```
Phase 1: Foundation  ──►  Phase 2: API Layer  ──►  Phase 3: Components & Forms
(shared types,           (HTTP client,            (error boundaries,
 barrels, cleanup)        proxy extraction)         RHF+zod, code splitting)
```

---

## Phase 1: Foundation

### 1.1 Shared Types (`types/index.ts`)

Centralize all shared type definitions into a single file, eliminating duplicates.

**`User` interface** (replaces duplicates in `lib/auth.ts` and `lib/auth-context.tsx`):
```ts
export interface User {
  id: number
  username: string
  email: string
  is_staff: boolean
  is_active: boolean
}
```

**Additional types:**
```ts
export interface ApiError {
  detail: string
  status: number
}

export interface TransferData {
  currency: string
  bank: string
  accountName: string
  accountNumber: string
  sortCode: string
}
```

Admin types from `components/admin/types/index.ts` should also be moved here.

**Files affected:**
- Create: `types/index.ts`
- Modify: `lib/auth.ts` (import `User` from `@/types`)
- Modify: `lib/auth-context.tsx` (import `User` from `@/types`)
- Modify: `components/give/transfer-card.tsx` (import `TransferData`)
- Modify: `lib/usePaystack.ts` (add PaystackPop type declaration)

### 1.2 Barrel Files

Create central re-export files for cleaner imports.

**`lib/index.ts`:**
```ts
export { getSession, requireAdmin, isAdmin } from './auth'
export { cn } from './utils'
export type { User, ApiError, TransferData } from '@/types'
```

**`components/ui/index.ts`:**
Re-export all UI components (shadcn-style barrel):
```ts
export { Button } from './button'
export { Card, CardHeader, CardContent } from './card'
// ... all 40+ components
```

**`hooks/index.ts`:**
```ts
export { useMobile } from '@/lib/hooks/use-mobile'
export { usePaystack } from '@/lib/usePaystack'
```

### 1.3 Duplicate File Cleanup

| File | Action | Keep |
|------|--------|------|
| `hooks/use-mobile.ts` | DELETE | `lib/hooks/use-mobile.ts` |
| `src/hooks/use-mobile.ts` | DELETE | `lib/hooks/use-mobile.ts` |
| `components/admin/lib/utils.ts` | DELETE | `@/lib/utils` directly |
| `components/icons/youtube-icon.tsx` | DELETE | `lucide-react` `Youtube` icon |
| `components/growth-track/form-hero.tsx` | DELETE | corrupted file |

### 1.4 Dead Code Removal

| File | Change |
|------|--------|
| `components/give/transfer-card.tsx` | Remove `import { div } from "framer-motion/client"` |
| `app/give/page.tsx` | Remove `{/* <WhereGiving /> */}` |
| `components/give/transfer-data.ts` | Remove placeholder data or fix if real |

### 1.5 Type `any` → Proper Types

| File | Line | Fix |
|------|------|-----|
| `components/give/transfer-card.tsx` | 9 | `{data: any}` → `{data: TransferData}` |
| `lib/usePaystack.ts` | 51 | `(window as any).PaystackPop` → typed declaration |
| `app/growth-track/enroll/page.tsx` | 11 | `async (data: any)` → typed callback |
| `components/plan-your-visit/plan-your-visit-form.tsx` | 58 | Remove `as any` cast |

### 1.6 Import Path Normalization

Normalize all imports within affected files to use `@/` paths instead of relative paths
(where barrel files make this possible).

---

## Phase 2: API Layer

### 2.1 Centralized HTTP Client (`lib/http-client.ts`)

Create a fetch wrapper with:
- Base URL from env
- Bearer token injection from `auth_token` cookie (server-side) or context (client-side)
- Response interceptor for error normalization
- Request/response type generics
- AbortController support

```ts
class HttpClient {
  private baseUrl: string

  async get<T>(path: string, options?: RequestInit): Promise<T>
  async post<T>(path: string, body?: unknown, options?: RequestInit): Promise<T>
  async put<T>(path: string, body?: unknown, options?: RequestInit): Promise<T>
  async delete<T>(path: string, options?: RequestInit): Promise<T>
}
```

### 2.2 Shared Proxy Utility (`lib/api-proxy.ts`)

Extract the duplicated `HOP_BY_HOP` + `filterHeaders` + proxy logic from
`app/api/register/route.ts` and `app/api/checkin/route.ts` into a reusable
`createProxyRoute(targetPath)` function.

```ts
// Usage in route files:
export const { GET, POST, PUT, PATCH, DELETE } = createProxyRoute('/api/register')
```

### 2.3 Shared Google Sheets Proxy (`lib/google-sheets.ts`)

Extract the duplicated Google Sheets submission pattern from
`app/api/enrollment/route.ts`, `app/api/makeup/route.ts`, `app/api/claimcert/route.ts`
into a reusable helper.

```ts
export async function submitToGoogleSheets(
  scriptUrl: string,
  data: Record<string, string>
): Promise<Response>
```

### 2.4 Auth API Client

Create `lib/auth-api.ts` wrapping login/me/logout calls through the HTTP client:

```ts
export const authApi = {
  login(email: string, password: string): Promise<{ success: boolean }>
  me(): Promise<User | null>
  logout(): Promise<void>
}
```

Update `lib/auth-context.tsx` to use `authApi` instead of raw fetch calls.

---

## Phase 3: Components & Forms

### 3.1 Error Boundary (`components/ui/error-boundary.tsx`)

A React error boundary component wrapping page/feature boundaries:

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

### 3.2 react-hook-form + zod Integration

Migrate all raw `useState`-based forms to use react-hook-form with zod schemas:

| Form | Current | Target |
|------|---------|--------|
| `app/sign-in/page.tsx` | Raw useState | RHF + zod (already done in auth migration) |
| `app/register/page.tsx` | ~305 lines raw | RHF + zod, extracted fields |
| `components/contact/contact-form.tsx` | Raw useState | RHF + zod |
| `components/plan-your-visit/plan-your-visit-form.tsx` | Raw useState | RHF + zod |
| `components/gta-form/*.tsx` | Raw useState | RHF + zod |

### 3.3 Code Splitting

- **`Sidebar.tsx`**: Externalize nav data to `components/admin/layout/nav-data.ts`
- **`connect-groups-section.tsx`**: Split ~550 lines into:
  - `connect-groups-list.tsx` — list rendering
  - `connect-group-modal.tsx` — modal
  - `connect-copy-button.tsx` — copy-to-clipboard
  - `connect-csv-export.tsx` — CSV export
- **`app/register/page.tsx`**: Split into form component + page shell

### 3.4 Consistent Loading/Error States

Define reusable `LoadingState`, `EmptyState`, `ErrorState` components and apply
them to all data-fetching pages.

---

## Files Summary

### Create (new files)
1. `types/index.ts`
2. `lib/index.ts`
3. `components/ui/index.ts`
4. `hooks/index.ts`
5. `lib/http-client.ts` (Phase 2)
6. `lib/api-proxy.ts` (Phase 2)
7. `lib/google-sheets.ts` (Phase 2)
8. `lib/auth-api.ts` (Phase 2)
9. `components/ui/error-boundary.tsx` (Phase 3)
10. `components/ui/loading-state.tsx` (Phase 3)
11. `components/admin/layout/nav-data.ts` (Phase 3)

### Modify
- `lib/auth.ts`
- `lib/auth-context.tsx`
- `components/give/transfer-card.tsx`
- `components/give/transfer-data.ts`
- `lib/usePaystack.ts`
- `app/give/page.tsx`
- `app/growth-track/enroll/page.tsx`
- `components/plan-your-visit/plan-your-visit-form.tsx`
- `app/register/page.tsx`
- `components/contact/contact-form.tsx`
- `components/plan-your-visit/plan-your-visit-form.tsx`
- `components/gta-form/*.tsx`
- `components/admin/layout/Sidebar.tsx`
- `components/connect/connect-groups-section.tsx`
- `app/api/register/route.ts`
- `app/api/checkin/route.ts`
- `app/api/enrollment/route.ts`
- `app/api/makeup/route.ts`
- `app/api/claimcert/route.ts`

### Delete
- `hooks/use-mobile.ts`
- `src/hooks/use-mobile.ts`
- `components/admin/lib/utils.ts`
- `components/icons/youtube-icon.tsx`
- `components/growth-track/form-hero.tsx`
