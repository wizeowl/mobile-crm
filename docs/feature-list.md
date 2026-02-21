# CRM Mobile Feature List

## Global product feature map

### Implemented now
1. Authentication and onboarding (`signup-signin`):
   - Sign-in with remember-me and password visibility toggle.
   - Multi-step sign-up wizard (4 steps).
   - SMS code input UI (dummy validation).
   - User profile onboarding fields (usage/role/preference).
   - Company onboarding fields (name, business direction, team size).
   - Team invite collection (dynamic member email rows).
   - Signup success state.
2. Projects and execution (`projects`):
   - Project-scoped task list with grouped sections.
   - Task filtering (period, group, reporter, assignees, estimate, priority).
   - Project details view.
   - Task details view with status updates and activity feed.
   - Time tracking modal with dummy save flow.
3. My profile and personal workspace (`my-profile`):
   - Profile overview with editable-style personal/company/contact fields (dummy data).
   - Tabbed personal views (`Projects`, `Team`, `Vacations`).
   - Current projects summary cards.
   - Team member directory cards.
   - Vacations list with status badges.
   - Add-request modal with days/hours modes, optional comment, and validation.
   - Settings sections with expandable notification preferences.
   - Notifications inbox modal.
4. Event planning (`add-event`):
   - Add-event modal form with category/priority/date/time selectors.
   - Repeat-event configuration (cadence, weekdays, repeat-time).
   - Local validation and dummy save service.
5. Project creation and setup (`add-project`):
   - Add-project form with metadata and avatar selection.
   - Add-task form for task bootstrap inside a project.
   - Empty-project state prompting first task creation.
6. Messaging workspace (`messenger`):
   - Conversation list with groups/direct messages and unread counters.
   - Chat thread with text, mention, link, and attachment message states.
   - In-thread search and typing indicator behaviors.
   - Message action sheet (pin/reply/share/edit/delete) and edit mode.
   - Chat details panel with members/files sections.
7. Employee management workspace (`employees`):
   - Employee directory list with profile metadata cards.
   - Employee activity board with backlog/in-progress/in-review counters.
   - Employee profile detail view with projects/team/vacations tabs.
   - Add-employee modal with dynamic email rows and validation.
8. Team-lead review workspace (`team-lead`):
   - Task details review screen focused on approval flow.
   - Status selection bottom sheet with review statuses.
   - Confirmation modal for closing/claiming completed tasks.
9. Info portal workspace (`info-portal`):
   - Folder-based documentation hub with KPI overview.
   - Folder detail view with structured requirements and attachments.
   - Folder sharing modal with multi-member selection/validation.
10. Calendar workspace (`calendar`):
   - Workweek calendar with month navigation and date selection.
   - Daily event list with compact/expanded states for crowded days.
   - Add-event integration using existing dummy event flow.
11. Vacations workspace (`vacations`):
   - Employee leave-balance directory (`Vacations`, `Sick Leave`, `Work remotely`).
   - Quick review list for team-level vacation planning.
12. Global FAB actions (`fab`):
   - Reusable bottom-sheet add menu.
   - Cross-navigation actions to project/task/event/request/employee/info-portal flows.

## Folder scope: `screens/signup-signin`

### Core flows
1. `Sign In`
   - Validate credentials locally.
   - Placeholder forgot-password action.
   - Navigate to sign-up flow.

2. `Sign Up - Step 1/4` (phone + credentials)
   - Collect phone, SMS code, email, and password.
   - Validate required identity/account fields.

3. `Sign Up - Step 2/4` (about user)
   - Collect usage intent and role.
   - Capture binary onboarding preference.

4. `Sign Up - Step 3/4` (company info)
   - Collect company name and industry.
   - Capture team-size segment.

5. `Sign Up - Step 4/4` (invites)
   - Add and edit invite emails.
   - Optional invite submission with row-level email validation.

6. `Sign Up - Success`
   - Confirm account creation.
   - Continue to next app entry point (dummy route to sign-in).

## Folder scope: `screens/projects`

### Core flows
1. `Projects - List`
   - Select project context.
   - Browse grouped task cards.
   - Open filters, project details, or task details.

2. `Projects - filters`
   - Configure multi-criteria task filters.
   - Save active filters and update match count.

3. `Projects - Project details`
   - View project metadata and assignee summary.
   - Trigger project-level quick actions (placeholder).

4. `Projects - task groups`
   - View tasks grouped by pipeline stage with counts.
   - Expand/collapse groups and open task details.

5. `Projects - task details`
   - View task metadata, attachments, prototype link, and activity.
   - Update task status.
   - Open time tracking entry flow.

6. `Projects - time tracking`
   - Fill time spent, date, time, and work description.
   - Validate and save with dummy service.

## Folder scope: `screens/my-profile`

### Core flows
1. `My Profile - Current Projects`
   - Show user summary, profile metadata, and project cards.
   - Switch between profile tabs.

2. `My Profile - My Team`
   - Show team directory cards from dummy data.

3. `My Profile - My vacations`
   - Show leave request history and statuses.
   - Open add-request flow.

4. `My Profile - My vacations - Add Request*`
   - Create request in days or hours mode.
   - Optional comment entry.
   - Validate days-left and time ranges.
   - Submit request via placeholder service.

5. `My Profile - Settings - one open`
   - Expand/collapse preference categories.
   - Toggle notification channels and quiet-hours option.

6. `Notifications`
   - Show notifications list in modal panel.
   - Close or tap row (placeholder).

## Folder scope: `screens/add-event`

### Core flows
1. `Add event`
   - Create one-time event with required metadata.
   - Save through placeholder service.

2. `Add event - repeat`
   - Enable repeat behavior.
   - Configure cadence + weekdays + repeat time.
   - Validate recurrence settings before save.

## Folder scope: `screens/add-project`

### Core flows
1. `Add Project`
   - Create project metadata (name, dates, priority, description).
   - Select visual avatar preset.
   - Save through placeholder service.

2. `Add Task`
   - Create task metadata inside selected project.
   - Save via placeholder service and append to task list.

3. `Projects - new - no tasks`
   - Show empty state when selected project has no tasks.
   - Route `+` action to add first task.

## Folder scope: `screens/messenger`

### Core flows
1. `Messenger`
   - Browse conversations by groups and direct messages.
   - Open thread from list.

2. `Conversation` states
   - Type/send messages.
   - Show typing indicator.
   - Mention member via autocomplete.
   - Send/edit/delete own messages.
   - Send link/attachment-style messages.
   - Search inside conversation.

3. `Message actions`
   - Open action sheet from message.
   - Trigger pin/reply/share/edit/delete (dummy behaviors).

4. `Chat details`
   - Open chat details page.
   - Expand/collapse members/files sections.

## Folder scope: `screens/employees`

### Core flows
1. `Employees - List`
   - Browse employee directory cards.
   - Open employee profile detail.
   - Switch to activity view.

2. `Employees - Activity`
   - Review per-employee workload counters.
   - Open employee profile from activity cards.

3. `Employee's Profile - Current Projects (for PM)`
   - View employee information and contact fields.
   - Browse employee `Projects`, `Team`, and `Vacations` tabs.

4. `Employees - Add Employee`
   - Add one or multiple members by email.
   - Validate required/format/duplicate constraints.
   - Approve via dummy service and append to local state.

## Folder scope: `screens/team-lead`

### Core flows
1. `Projects - task details - in review`
   - Review task context and supporting details.
   - Trigger status decision as team lead.

2. `Projects - task details - select status`
   - Select a target task status from review options.
   - Approve non-final status changes directly.

3. `Projects - task details - pop up`
   - Confirm move to completed state (`Done`).
   - Finalize closure through dummy approval service.

## Folder scope: `screens/info-portal`

### Core flows
1. `Info Portal`
   - View folder KPI summary and folder cards.
   - Open a folder detail context.

2. `Info Portal - folder`
   - Read requirement sections and attachments.
   - Trigger share and edit actions.

3. `Info Portal - folder - share`
   - Select one or many members.
   - Validate row entries and prevent duplicates.
   - Share folder via placeholder service.

## Folder scope: `screens/calendar`

### Core flows
1. `Calendar`
   - Navigate between months in workweek layout.
   - Select date and review associated events.
   - Add event through floating action.

2. `Calendar - 4 and more events`
   - Expand selected-day list to reveal additional events.
   - Preserve day selection and indicators while expanding.

## Folder scope: `screens/vacations`

### Core flows
1. `Vacations - Employees’ vacations`
   - Browse employee leave-balance cards.
   - Trigger add-request placeholder action from FAB.

## Folder scope: `screens/fab`

### Core flows
1. `Dashboard - add`
   - Open reusable add-action sheet.
   - Trigger create/navigation actions for project, task, event, request, employee, and info-portal folder.
