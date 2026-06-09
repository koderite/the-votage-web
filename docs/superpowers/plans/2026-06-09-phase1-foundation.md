# Phase 1: Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish shared types, barrel files, remove duplicates, fix `any` escapes, and clean dead code.

**Architecture:** Phase 1 builds the foundation for all subsequent optimization. Shared types in `types/index.ts` eliminate the duplicate `User` interface. Barrel files provide clean `@/` imports. Duplicate file cleanup reduces confusion. Type fixes remove `any` escapes.

**Tech Stack:** TypeScript, Next.js 16

---

### Task 1: Create shared types (`types/index.ts`)

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Create `types/index.ts`**

```typescript
export interface User {
  id: number
  username: string
  email: string
  is_staff: boolean
  is_active: boolean
}

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

export interface PaystackPopConfig {
  key: string
  email: string
  amount: number
  currency?: string
  ref?: string
  metadata?: Record<string, unknown>
  callback: (response: { reference: string; transaction: string; status: string }) => void
  onClose: () => void
}

export interface PaystackPop {
  newTransaction(config: PaystackPopConfig): void
}
```

- [ ] **Step 2: Verify file exists**

Run: `Test-Path types/index.ts`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add types/index.ts
git commit -m "feat(types): add shared User, ApiError, TransferData, PaystackPop types"
```

---

### Task 2: Update `lib/auth.ts` to use shared `User` type

**Files:**
- Modify: `lib/auth.ts:6-12`

- [ ] **Step 1: Read current `lib/auth.ts`**

- [ ] **Step 2: Replace inline `User` interface with import**

Remove lines 6-12 (the inline `interface User`), add import:
```typescript
import type { User } from '@/types'
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | Select-String -NotMatch "node_modules"`
Expected: No errors related to `User` type

- [ ] **Step 4: Commit**

```bash
git add lib/auth.ts
git commit -m "refactor(auth): use shared User type from @/types"
```

---

### Task 3: Update `lib/auth-context.tsx` to use shared `User` type

**Files:**
- Modify: `lib/auth-context.tsx:6-12`

- [ ] **Step 1: Read current `lib/auth-context.tsx`**

- [ ] **Step 2: Replace inline `User` interface with import**

Remove lines 6-12 (the inline `interface User`), add import:
```typescript
import type { User } from '@/types'
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | Select-String -NotMatch "node_modules"`
Expected: No errors related to `User` type

- [ ] **Step 4: Commit**

```bash
git add lib/auth-context.tsx
git commit -m "refactor(auth-context): use shared User type from @/types"
```

---

### Task 4: Create barrel files

**Files:**
- Create: `lib/index.ts`
- Create: `components/ui/index.ts`
- Create: `hooks/index.ts`

- [ ] **Step 1: Read `lib/` directory to enumerate all exports**

- [ ] **Step 2: Create `lib/index.ts`**

```typescript
export { getSession, requireAdmin, isAdmin } from './auth'
export { cn } from './utils'
export type { User, ApiError, TransferData, PaystackPop, PaystackPopConfig } from '@/types'
```

- [ ] **Step 3: Read `components/ui/` directory to enumerate all UI components**

- [ ] **Step 4: Create `components/ui/index.ts`**

```typescript
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from './alert-dialog'
export { Avatar, AvatarImage, AvatarFallback } from './avatar'
export { Badge } from './badge'
export { Button } from './button'
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card'
export { Checkbox } from './checkbox'
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './dialog'
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './dropdown-menu'
export { Input } from './input'
export { Label } from './label'
export { Progress } from './progress'
export { RadioGroup, RadioGroupItem } from './radio-group'
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from './select'
export { Separator } from './separator'
export { Skeleton } from './skeleton'
export { Switch } from './switch'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
export { Textarea } from './textarea'
export { Toggle } from './toggle'
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip'
export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form'
export { ScrollArea } from './scroll-area'
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from './sheet'
export { Toast } from './toast'
export { Toaster } from './sonner'
```

- [ ] **Step 5: Create `hooks/index.ts`**

```typescript
export { useMobile } from '@/lib/hooks/use-mobile'
export { usePaystack } from '@/lib/usePaystack'
export { useAuth } from '@/lib/auth-context'
```

- [ ] **Step 6: Commit**

```bash
git add lib/index.ts components/ui/index.ts hooks/index.ts
git commit -m "feat(barrels): add lib, components/ui, and hooks barrel files"
```

---

### Task 5: Fix type escapes — `transfer-card.tsx`

**Files:**
- Modify: `components/give/transfer-card.tsx:6-9`

- [ ] **Step 1: Read current `components/give/transfer-card.tsx`**

- [ ] **Step 2: Remove unused import and type the `data` prop**

Remove line 6: `import { div } from "framer-motion/client"`
Change line 9: `{data: any}` → `{data: TransferData}`

Add import:
```typescript
import type { TransferData } from '@/types'
```

- [ ] **Step 3: Verify compiles**

- [ ] **Step 4: Commit**

```bash
git add components/give/transfer-card.tsx
git commit -m "fix(transfer-card): remove unused import, type data prop"
```

---

### Task 6: Fix type escapes — `usePaystack.ts`

**Files:**
- Modify: `lib/usePaystack.ts:51`

- [ ] **Step 1: Read current `lib/usePaystack.ts`**

- [ ] **Step 2: Replace `(window as any).PaystackPop` with typed version**

Add import:
```typescript
import type { PaystackPop } from '@/types'
```

Change line 51:
```typescript
const PaystackPop = (window as unknown as { PaystackPop: new () => PaystackPop }).PaystackPop
```

Or simpler — add a declaration at top of file:
```typescript
declare global {
  interface Window {
    PaystackPop: new () => PaystackPop
  }
}
```

Then use: `new window.PaystackPop()`

- [ ] **Step 3: Verify compiles**

- [ ] **Step 4: Commit**

```bash
git add lib/usePaystack.ts
git commit -m "fix(usePaystack): type window.PaystackPop instead of using any"
```

---

### Task 7: Fix type escapes — `enroll/page.tsx`

**Files:**
- Modify: `app/growth-track/enroll/page.tsx:11`

- [ ] **Step 1: Read current `app/growth-track/enroll/page.tsx`**

- [ ] **Step 2: Type the callback parameter**

Change: `async (data: any)` → typed interface (use the form data shape or `Record<string, unknown>`)

```typescript
async (data: Record<string, unknown>) => {
```

- [ ] **Step 3: Verify compiles**

- [ ] **Step 4: Commit**

```bash
git add app/growth-track/enroll/page.tsx
git commit -m "fix(enroll): type callback parameter instead of any"
```

---

### Task 8: Fix type escapes — `plan-your-visit-form.tsx`

**Files:**
- Modify: `components/plan-your-visit/plan-your-visit-form.tsx:58`

- [ ] **Step 1: Read current `components/plan-your-visit/plan-your-visit-form.tsx`**

- [ ] **Step 2: Remove `as any` cast on the ref**

Change: `useRef<HTMLFormElement>(null) as any` → `useRef<HTMLFormElement>(null)`

And update the submit handler to properly type the event parameter.

- [ ] **Step 3: Verify compiles**

- [ ] **Step 4: Commit**

```bash
git add components/plan-your-visit/plan-your-visit-form.tsx
git commit -m "fix(plan-your-visit): remove as any cast on form ref"
```

---

### Task 9: Delete duplicate files

**Files:**
- Delete: `hooks/use-mobile.ts`
- Delete: `src/hooks/use-mobile.ts`
- Delete: `components/admin/lib/utils.ts`
- Delete: `components/icons/youtube-icon.tsx`
- Delete: `components/growth-track/form-hero.tsx`

- [ ] **Step 1: Delete each duplicate file**

```bash
Remove-Item "hooks/use-mobile.ts" -Force
Remove-Item "src/hooks/use-mobile.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "components/admin/lib/utils.ts" -Force
Remove-Item "components/icons/youtube-icon.tsx" -Force
Remove-Item "components/growth-track/form-hero.tsx" -Force
```

- [ ] **Step 2: Check for imports of deleted files**

Use grep to find any remaining references:
```bash
rg "hooks/use-mobile" --include "*.ts" --include "*.tsx"
rg "admin/lib/utils" --include "*.ts" --include "*.tsx"
rg "youtube-icon" --include "*.ts" --include "*.tsx"
rg "form-hero" --include "*.ts" --include "*.tsx"
```

- [ ] **Step 3: Update any imports found in step 2 to use new paths**

- [ ] **Step 4: Verify compiles**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(cleanup): delete duplicate files (use-mobile, admin/utils, youtube-icon, form-hero)"
```

---

### Task 10: Remove dead code

**Files:**
- Modify: `app/give/page.tsx` — remove commented WhereGiving
- Modify: `components/give/transfer-data.ts` — fix or remove placeholder data

- [ ] **Step 1: Read `app/give/page.tsx`**

- [ ] **Step 2: Remove the commented-out `{/* <WhereGiving /> */}` line**

- [ ] **Step 3: Read `components/give/transfer-data.ts`**

- [ ] **Step 4: Fix the placeholder data** (all currencies have identical bank details — if real, they need distinct values; if placeholder, add a note or use realistic but clearly sample data)

- [ ] **Step 5: Verify compiles**

- [ ] **Step 6: Commit**

```bash
git add app/give/page.tsx components/give/transfer-data.ts
git commit -m "chore(cleanup): remove dead code and fix placeholder data"
```

---

### Task 11: Final verification

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1
```
Expected: No errors

- [ ] **Step 2: Run lint**

```bash
npx eslint . --ext .ts,.tsx 2>&1
```
Expected: No errors

- [ ] **Step 3: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: final cleanup after Phase 1 foundation"
```
