# FAB Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/fab`

## Screens in this folder
1. `Dashboard - add.png`

## Screen-by-screen analysis

### 1) Dashboard - add
- Purpose: global quick-add sheet for cross-workspace creation/navigation.
- Primary content:
  - Bottom sheet title (`Add...`).
  - Action rows:
    - `Project`
    - `Task`
    - `Event`
    - `Request`
    - `Employee`
    - `Folder to Info Portal`
- States:
  - Sheet visible/hidden.
  - Action selection.
- Interactions:
  - Select one action to open corresponding flow.
  - Dismiss by tapping outside.
- Validation rules:
  - None.

## Assumptions (pending approval)
1. FAB sheet is implemented as reusable add-action menu in projects flow (instead of native alert).
2. Some actions open existing create modals (`Project`, `Task`, `Event`) while navigation actions route to corresponding workspaces (`Request`, `Employee`, `Folder to Info Portal`).
