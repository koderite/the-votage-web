# Admin Pages — Realistic Data & Functionality

## Overview

Replace all hardcoded/static data across 8 admin pages with computed-from-source realistic mock data. Search, filters, dropdowns, and state changes actually affect the rendered data. Architecture mirrors what a real API integration would look like.

## Data Model 

### `components/admin/data/members.ts`

```typescript
interface AttendanceRecord {
  date: string
  services: ('1st' | '2nd' | '3rd')[]
}

interface Member {
  id: number
  name: string
  phone: string
  email: string
  gender: 'Male' | 'Female'
  department: Department
  maritalStatus: 'Single' | 'Married' | 'Widowed'
  joined: string
  attendance: AttendanceRecord[]
}

type Department =
  | 'RMG (Choir)' | 'Ushering' | 'Media' | 'Protocol'
  | 'VIP' | 'Next (Youth)' | 'Kids'
  | 'Sanitation (Sanctuary)' | 'Prayer'
```

~40 members with realistic Nigerian names, phone numbers, emails. Departments distributed across members. Attendance records generated for the last 8 Sundays with ~60% meeting active threshold.

### Derived Metrics

| Metric | Definition |
|--------|-----------|
| Active | Attended ≥3 of last 4 Sundays (any service) |
| Returning | Was absent ≥1 month, then attended ≥1 of last 4 Sundays |
| New This Month | `joined` month/year matches current month |
| Needs Attention | No attendance in ≥3 weeks |

### Service Types

- 1st Service (7:00 AM)
- 2nd Service (8:30 AM)
- 3rd Service (10:00 AM)

## Pages

### 1. Dashboard (`/admin/dashboard`)

4 stat cards computed from member data:
- Total Members → `members.length`
- Active Members → computed from attendance
- Returning Members → computed from attendance
- New This Month → from `joined` field

Charts pull from properly generated attendance dataset.

### 2. Attendance Breakdown (`/admin/attendance/breakdown`)

- **Date Range filter**: slices how many weeks of chart data to show
- **Service Type filter**: filters stacked bar to selected service(s)
- **Department filter**: recalculates stat cards for that dept only
- **Event search**: functional (already works)
- Check-in Method donut chart: static breakdown (72/22/6)

### 3. Check-in (`/admin/attendance/checkin`)

- **Service buttons (1st/2nd/3rd)**: clicking changes the "Real-Time Check in" count and chart data
- **Search** filters the member insight table
- Chart shows check-in timeline for selected service

### 4. Onboarding Follow-up (`/admin/followup/onboarding`)

- New members list: varied names and progress percentages
- "Needs attention (9)" pill: computed from members without attendance ≥3 weeks
- "New this month (22)": computed from `joined` dates
- Contact attempts, birthdays: generated from member data

### 5. Members Insights (`/admin/members/insights`)

- Department chart: bars computed from actual member department distribution
- Table shows shared dataset with search + status filter
- Stat cards computed from filtered data

### 6. Members List (`/admin/members`)

- Table shows all members with search + status filter
- Stat cards react to filters
- "Add member" modal: updated with phone, gender, department, marital status fields

### 7. Manage Members (`/admin/members/manage`)

- Same as Members list + edit/delete/toggle functionality
- Delete confirmation dialog
- Status toggle (Active/Inactive based on attendance threshold)

### 8. Reports (`/admin/reports`)

- Report cards: informational (no data changes needed)
- Attendance view: service dropdown filters table rows
- Members view: shared dataset with search
- Export buttons: UI only (future scope)

## Shared Data Flow

```
components/admin/data/members.ts
  ├── allMembers[]          ← 40 realistic members
  ├── departments[]          ← department list
  ├── services[]             ← service list
  ├── computeStats()         ← { total, active, returning, newThisMonth }
  ├── isActive()             ← attendance threshold check
  ├── isReturning()          ← absence-then-return check
  ├── needsAttention()       ← no attendance ≥3 weeks
  └── attendanceHistory[]    ← generated attendance dataset for charts
```

Every page imports from this single source. When search/filter changes the visible member set, stats recompute naturally (just like an API response).

## AddMemberModal Updates

Current modal fields: firstName, lastName, email, role, status
New modal fields: firstName, lastName, email, phone, gender, department (dropdown), marital status (dropdown)

## Non-goals

- Actual API integration (future)
- PDF/CSV export (future)
- Real-time WebSocket updates (future)
- Authentication changes
