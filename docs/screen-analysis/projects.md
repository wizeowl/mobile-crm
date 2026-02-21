# Projects Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/projects`

## Screens in this folder
1. `Projects - List.png`
2. `Projects - filters.png`
3. `Projects - Project details.png`
4. `Projects  - task groups.png`
5. `Projects - task details.png`
6. `Projects - time tracking.png`

## Screen-by-screen analysis

### 1) Projects - List
- Purpose: entry point for project execution; shows active project context and task list summary.
- Primary content:
  - Top app bar (logo, search, notifications, avatar).
  - Current project dropdown.
  - `View details` action.
  - Filter trigger icon.
  - `Tasks` section with group pill (e.g., `Active Tasks`).
  - Compact task cards with task name, estimate, spent time, assignee, priority, and status.
  - Group divider with count (e.g., `Development`, `Backlog`).
  - Floating add action.
- States:
  - Default list.
  - Empty task result for selected filters.
  - Loading data.
  - Filtered list.
- Interactions:
  - Open project selector.
  - Open filter panel.
  - Tap `View details`.
  - Tap a task row to open task details.
  - Tap add action (placeholder).
- Validation rules:
  - No strict field validation; only interaction/state constraints.

### 2) Projects - filters
- Purpose: filter tasks by period, group, reporter, assignee, estimate, and priority.
- Primary content:
  - Side panel/modal with dismiss icon.
  - Period selector.
  - Task group multi-select checkboxes.
  - Reporter multi-select list (with `View more`).
  - Assignee filter (search + selected chips).
  - Estimate selector.
  - Priority selector.
  - Match count + `Save Filters` CTA.
- States:
  - Closed/open.
  - Selected/unselected options.
  - Partial selections.
  - Dirty vs saved filter state.
- Interactions:
  - Toggle checkboxes and chips.
  - Open/select dropdown values.
  - Search assignees.
  - Save filters.
  - Close panel.
- Validation rules:
  - All filters optional.
  - If `estimate` is entered, duration must be valid format.
  - If `priority` selected, must be one of allowed options.

### 3) Projects - Project details
- Purpose: display project-level metadata and overview.
- Primary content:
  - Back action to projects list.
  - Project title.
  - Details card with project number, description, reporter, assignees, priority, deadline, created date.
  - Inline action icons (edit/link style actions).
  - Floating add action.
- States:
  - Default.
  - Loading.
  - Expanded/collapsed description (assumed optional enhancement).
- Interactions:
  - Back to project list.
  - Open assignee context.
  - Trigger quick actions (placeholder).
  - Open add action (placeholder).
- Validation rules:
  - No direct form validation in view mode.

### 4) Projects - task groups
- Purpose: list tasks grouped by workflow stage with visible counts.
- Primary content:
  - Same top context as list.
  - Group headers with item counts (`In Progress`, `Development`, etc.).
  - Task cards grouped by workflow stage.
- States:
  - Default grouped view.
  - Expanded/collapsed groups.
  - Filtered grouped view.
- Interactions:
  - Expand/collapse group sections.
  - Tap task to open task details.
- Validation rules:
  - No direct form validation.

### 5) Projects - task details
- Purpose: inspect task metadata, time logs, attachments, and activity history.
- Primary content:
  - Back action and task title.
  - `Task Info` card with reporter, assignee, priority, deadline.
  - Time tracking summary + `Log time`.
  - `Task Details` card with status selector, description, attachments, prototype link.
  - `Recent Activity` feed.
  - Floating add action.
- States:
  - Default.
  - Status selected.
  - Loading task detail data.
  - Activity collapsed/expanded.
- Interactions:
  - Change task status.
  - Open time tracking modal.
  - Open attachments.
  - Open prototype link (placeholder).
  - View more activity.
- Validation rules:
  - Status change must map to an allowed status option.

### 6) Projects - time tracking
- Purpose: capture and submit work-log entries for a task.
- Primary content:
  - Modal/sheet with close icon.
  - Logged vs original estimate summary.
  - Time spent input.
  - Date input.
  - Time input.
  - Work description textarea.
  - Save CTA.
- States:
  - Closed/open.
  - Input focus.
  - Validation errors.
  - Saving state.
- Interactions:
  - Edit all fields.
  - Save time entry.
  - Close/cancel.
- Validation rules:
  - `time spent` required.
  - `date` required and valid date format.
  - `time` required and valid time format.
  - `work description` required, minimum descriptive length.

## Assumptions (pending approval)
1. Filter panel is modeled as a modal sheet rather than a full routed page.
2. Project/task actions shown as icons are placeholder-only in this phase.
3. For `time spent`, free text duration format is accepted in dummy mode (e.g., `1w 4d 6h 40m`) as long as non-empty.
4. Group sections in `task groups` are collapsible for usability, although static mockups do not show collapse icons.
