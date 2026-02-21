# Team Lead Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/team-lead`

## Screens in this folder
1. `Projects - task details - in review.png`
2. `Projects - task details - select status.png`
3. `Projects - task details - pop up.png`

## Screen-by-screen analysis

### 1) Projects - task details - in review
- Purpose: team-lead review view for a task currently in `In Review`.
- Primary content:
  - Back to projects + task title.
  - Task info block (reporter, assignee, priority, deadline, time tracking summary).
  - Task details block with status pill and edit action.
  - Attachments, prototype link, and recent activity.
- States:
  - Base review state with current status shown as `In Review`.
- Interactions:
  - Open status selection.
  - Open time log action (placeholder in this folder).
  - Return to projects.
- Validation rules:
  - None in base state.

### 2) Projects - task details - select status
- Purpose: select next task status during review.
- Primary content:
  - Bottom sheet with task statuses (`To Do`, `In Progress`, `In Review`, `Done`).
  - Single primary `Approve` action.
- States:
  - Sheet open/closed.
  - Selected status radio state.
- Interactions:
  - Change selected status.
  - Confirm selection.
- Validation rules:
  - A status must be selected before approval.

### 3) Projects - task details - pop up
- Purpose: explicit confirmation when moving task to completed state.
- Primary content:
  - Modal card with confirmation copy and close icon.
  - Primary `Approve Task` action.
- States:
  - Confirmation open/closed.
  - Loading while approving.
- Interactions:
  - Confirm completion.
  - Dismiss modal.
- Validation rules:
  - Confirmation is required before finalizing move to `Done`.

## Assumptions (pending approval)
1. Team-lead review flow is opened from projects task details when editing status of an `In Review` task.
2. `Approve` for statuses other than `Done` applies immediately in dummy mode.
3. Selecting `Done` always requires the confirmation modal.
4. Time logging and attachment open actions remain placeholders in this folder scope.
