# Vacations Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/vacations`

## Screens in this folder
1. `Vacations - Employees’ vacations.png`

## Screen-by-screen analysis

### 1) Vacations - Employees’ vacations
- Purpose: manager overview of team leave balances and remote-work quotas.
- Primary content:
  - Page title (`Vacations`).
  - Employee cards with avatar, name/email, and metrics:
    - `Vacations`
    - `Sick Leave`
    - `Work remotely`
  - Floating add action.
- States:
  - Default loaded list.
- Interactions:
  - Scroll employee balances.
  - Trigger add request flow from FAB (placeholder in this scope).
- Validation rules:
  - None on read mode.

## Assumptions (pending approval)
1. Vacations workspace is opened from the FAB action sheet (`Request` action) in projects.
2. FAB action uses placeholder behavior that points users to request creation flow (no backend integration).
