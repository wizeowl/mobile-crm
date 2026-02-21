# Add Project Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/add-project`

## Screens in this folder
1. `Add Project.png`
2. `Add Task.png`
3. `Projects - new - no tasks.png`

## Screen-by-screen analysis

### 1) Add Project
- Purpose: create a new project workspace with metadata and visual avatar.
- Primary content:
  - Project name input.
  - Start date selector.
  - Deadline selector.
  - Priority selector.
  - Description input.
  - Image/avatar selection grid.
  - Quick action icons row.
  - Primary CTA: `Save Project`.
- States:
  - Default form.
  - Image selected.
  - Validation errors.
  - Saving state.
- Interactions:
  - Fill project fields.
  - Select avatar image.
  - Save project.
  - Close modal.
- Validation rules:
  - Project name required.
  - Start date required.
  - Deadline required.
  - Priority required.
  - Description optional.
  - Selected avatar optional (assumed).

### 2) Add Task
- Purpose: create a task inside the currently selected project.
- Primary content:
  - Task name input.
  - Task group selector.
  - Estimate selector.
  - Deadline selector.
  - Priority selector.
  - Assignee selector.
  - Description input.
  - Quick action icons row.
  - Primary CTA: `Save Task`.
- States:
  - Default form.
  - Validation error state.
  - Saving state.
- Interactions:
  - Fill task metadata.
  - Pick dropdown values.
  - Save task.
  - Close modal.
- Validation rules:
  - Task name required.
  - Task group required.
  - Estimate required.
  - Deadline required.
  - Priority required.
  - Assignee required.
  - Description optional.

### 3) Projects - new - no tasks
- Purpose: empty-state project view when no tasks exist.
- Primary content:
  - Projects header + selected project card.
  - Empty-state illustration area.
  - Message prompting task creation.
  - Floating add action.
- States:
  - Empty task list state.
- Interactions:
  - View selected project details.
  - Tap floating add to create first task.
- Validation rules:
  - No direct form validation.

## Assumptions (pending approval)
1. Description fields in add-project and add-task are optional.
2. Avatar/image selection in add-project is optional in this phase.
3. Empty-state floating `+` opens `Add Task` directly when project has no tasks.
