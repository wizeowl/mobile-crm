# Employees Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/employees`

## Screens in this folder
1. `Employees - List.png`
2. `Employees - Activity.png`
3. `Employee's  Profile - Current Projects (for PM).png`
4. `Employees - Add Employee.png`

## Screen-by-screen analysis

### 1) Employees - List
- Purpose: people directory view for managers to inspect employee snapshots.
- Primary content:
  - Page title with employee count.
  - Two-state segment (`List` / `Activity`).
  - Employee cards with identity, metadata, and position/seniority.
  - Pagination row (`1-8 of 28`) and floating add action.
- States:
  - List tab active.
  - Card set loaded.
- Interactions:
  - Tap employee card to open employee profile.
  - Switch to activity tab.
  - Open add-employee modal from FAB.
- Validation rules:
  - None on this screen.

### 2) Employees - Activity
- Purpose: team operational workload snapshot by employee.
- Primary content:
  - Same title and segment controls.
  - Activity cards with metrics (`Backlog`, `In Progress`, `In Review`).
  - Highlight card state for attention.
  - Pagination row + FAB.
- States:
  - Activity tab active.
  - Highlighted/normal activity cards.
- Interactions:
  - Tap card to open employee profile.
  - Open add-employee modal.
  - Switch back to list tab.
- Validation rules:
  - None on this screen.

### 3) Employee's Profile - Current Projects (for PM)
- Purpose: manager-facing employee detail workspace.
- Primary content:
  - Employee identity/header card.
  - Main info + contact info field shells.
  - Secondary segment (`Projects`, `Team`, `Vacations`).
  - Current projects list cards (default selected tab in mock).
- States:
  - Selected profile tab (projects/team/vacations).
  - Back navigation to employees list.
- Interactions:
  - Switch profile tabs.
  - Return to employees list.
  - Placeholder filter action.
- Validation rules:
  - None (read-only dummy view).

### 4) Employees - Add Employee
- Purpose: add one or more employees by email.
- Primary content:
  - Modal with dynamic email rows.
  - `Add another Member` inline action.
  - Primary `Approve` action.
- States:
  - Closed/open modal.
  - Multiple email rows.
  - Loading while approving.
  - Field error states.
- Interactions:
  - Add email rows.
  - Edit rows.
  - Approve submission.
  - Dismiss modal.
- Validation rules:
  - Every row required.
  - Email format must be valid.
  - Duplicate email values are invalid.

## Assumptions (pending approval)
1. Employees workspace opens from `my-profile` team context (team cards and team-tab FAB).
2. Add-employee action is dummy-only and prepends generated users from entered emails.
3. Employee profile tabs reuse the same employee context: `Projects` shows project summaries, `Team` shows directory cards, `Vacations` shows leave summaries.
4. Pagination controls are visual placeholders (no server-side paging).
