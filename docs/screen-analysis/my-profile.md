# My Profile Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/my-profile`

## Screens in this folder
1. `Dashboard - Nearest events.png`
2. `My Profile - Current Projects.png`
3. `My Profile - My Team.png`
4. `My Profile - My vacations.png`
5. `My Profile - My vacations - Add Request.png`
6. `My Profile - My vacations - Add Request - 3 days.png`
7. `My Profile - My vacations - Add Request - hours.png`
8. `My Profile - My vacations - Add Request - comment.png`
9. `My Profile - My vacations - Add Request - validation.png`
10. `My Profile - Settings - one open.png`
11. `Notifications.png`

## Screen-by-screen analysis

### 1) Dashboard - Nearest events
- Purpose: settings-like dashboard panel (asset appears to match the expanded settings pattern).
- Primary content:
  - App top bar.
  - Back action (`Back to Profile`).
  - Settings list with one expanded section.
  - Floating add action.
- States:
  - Collapsed settings items.
  - One expanded section (notifications controls).
- Interactions:
  - Expand/collapse settings categories.
  - Toggle notification preferences.
- Validation rules:
  - No strict input validation.

### 2) My Profile - Current Projects
- Purpose: user profile overview with current project cards.
- Primary content:
  - Top app bar + profile header.
  - Main info fields (position, company, location, birth date).
  - Contact info fields (email, phone, Skype).
  - Tab switch (`Projects`, `Team`, `Vacations`).
  - Current project cards with metrics.
- States:
  - Projects tab active.
  - Loading profile/projects.
- Interactions:
  - Switch tabs.
  - Open project card (placeholder action).
  - Open settings and notifications actions.
- Validation rules:
  - No form submission in this state.

### 3) My Profile - My Team
- Purpose: profile tab focused on team roster.
- Primary content:
  - Same profile header and info sections.
  - Team tab active.
  - Team member cards (name, role, seniority, status).
- States:
  - Team tab active.
  - Team member list variants (`Added`, `Middle`, etc.).
- Interactions:
  - Switch tabs.
  - Tap team cards (placeholder action).
- Validation rules:
  - None.

### 4) My Profile - My vacations
- Purpose: profile tab focused on leave/request history.
- Primary content:
  - Same profile sections.
  - Vacations tab active.
  - Request entries with type, period, and status badge.
  - Floating action to add request.
- States:
  - Vacations tab active.
  - Mixed status badges (`Pending`, `Approved`).
- Interactions:
  - Open add request modal.
  - Switch tabs.
- Validation rules:
  - None in list view.

### 5) Add Request (base)
- Purpose: create leave/work-remote request.
- Primary content:
  - Modal card.
  - Request type radios (`Vacation`, `Sick Leave`, `Work remotely`).
  - Mode switch (`Days`, `Hours`).
  - Calendar-like date picker.
  - Submit button (`Send Request`).
- States:
  - Days mode selected.
  - Single-day selection.
- Interactions:
  - Select request type.
  - Switch days/hours mode.
  - Select date(s).
  - Submit request.
- Validation rules:
  - Request type required.
  - At least one day required in days mode.

### 6) Add Request - 3 days
- Purpose: days-range selection state.
- Primary content:
  - Same modal as base.
  - Multi-day selected range in calendar.
- States:
  - 3-day range selected.
- Interactions:
  - Extend or reduce selected range.
- Validation rules:
  - Range end must be on/after start.

### 7) Add Request - hours
- Purpose: partial-day request state.
- Primary content:
  - Hours mode selected.
  - `From` and `To` time fields.
  - Computed duration summary (`Time for Vacation`).
- States:
  - Valid time interval selected.
- Interactions:
  - Select from/to times.
  - Submit request.
- Validation rules:
  - `From` and `To` required.
  - `To` must be after `From`.

### 8) Add Request - comment
- Purpose: add explanatory note for request.
- Primary content:
  - Days mode selection.
  - Comment text area.
- States:
  - Comment typed/empty.
- Interactions:
  - Enter comment.
  - Submit request.
- Validation rules:
  - Comment optional (assumed).

### 9) Add Request - validation
- Purpose: show insufficient vacation balance.
- Primary content:
  - Error callout indicating remaining vacation allowance.
  - Highlighted invalid range.
- States:
  - Validation error visible.
- Interactions:
  - Adjust selected range.
  - Retry submit.
- Validation rules:
  - Selected vacation days must not exceed remaining allowance.

### 10) Settings - one open
- Purpose: settings/preferences screen for account and notification controls.
- Primary content:
  - Settings list sections.
  - Expanded `Notifications` section with toggles.
  - Checkbox-like `Don't send me notifications after 9:00 PM`.
- States:
  - Collapsed list.
  - Expanded notifications section.
  - Toggle on/off combinations.
- Interactions:
  - Expand/collapse section.
  - Toggle controls.
- Validation rules:
  - No strict validation.

### 11) Notifications
- Purpose: notification inbox panel.
- Primary content:
  - Notification rows with actor avatar, message, and timestamp.
  - Close icon.
- States:
  - Open/closed.
  - List scrolled.
- Interactions:
  - Open/close panel.
  - Tap notification item (placeholder action).
- Validation rules:
  - None.

## Assumptions (pending approval)
1. `Dashboard - Nearest events.png` is treated as the expanded settings variant because the visible UI matches that structure.
2. Comment in add-request flow is optional.
3. Vacation-day balance check uses a fixed dummy allowance.
4. Notifications rows are read-only in this phase (no deep linking).
