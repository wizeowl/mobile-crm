# Info Portal Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/info-portal`

## Screens in this folder
1. `Info Portal.png`
2. `Info Portal - folder.png`
3. `Info Portal - folder - share.png`

## Screen-by-screen analysis

### 1) Info Portal
- Purpose: top-level workspace for project documentation folders.
- Primary content:
  - KPI summary card (`Current Projects`, growth metric).
  - Folder list cards with folder color, name, and page count.
  - Floating create action.
- States:
  - Default list loaded.
  - Multiple folder color variants.
- Interactions:
  - Open folder details.
  - Open create-folder/content action (placeholder).
- Validation rules:
  - None.

### 2) Info Portal - folder
- Purpose: read folder content and attachments for selected project docs.
- Primary content:
  - Back link to portal list.
  - Folder title and task selector card.
  - Section header with edit/share actions.
  - Long-form requirement sections.
  - Attachments list.
  - Floating create action.
- States:
  - Folder detail with content sections loaded.
- Interactions:
  - Back to folder list.
  - Open share modal.
  - Trigger edit action (placeholder).
  - Trigger create action (placeholder).
- Validation rules:
  - None in read mode.

### 3) Info Portal - folder - share
- Purpose: share selected folder with one or more members.
- Primary content:
  - Share modal card.
  - Dynamic member select rows.
  - `Add another Member` action.
  - Primary `Share` action.
- States:
  - Closed/open modal.
  - Open/close member picker.
  - Loading while sharing.
  - Row-level error states.
- Interactions:
  - Select member for row.
  - Add additional member rows.
  - Submit share action.
- Validation rules:
  - Every row requires a selected member.
  - Same member cannot be selected twice.

## Assumptions (pending approval)
1. Info Portal opens from projects task details when user taps `Vision Prototype`.
2. Create/edit actions in this folder are placeholder-only (no backend/content editor yet).
3. Share action only stores selection in local dummy flow and returns success.
4. Folder technical task selector is static in current scope (single task context).
