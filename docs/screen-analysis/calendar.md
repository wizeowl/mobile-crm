# Calendar Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/calendar`

## Screens in this folder
1. `Calendar.png`
2. `Calendar - 4 and more events.png`

## Screen-by-screen analysis

### 1) Calendar
- Purpose: calendar overview for workweek planning and daily events.
- Primary content:
  - Month card with month navigation.
  - Workweek day grid (`Mon` to `Fri`) with date selection.
  - Dots per date indicating event presence.
  - Selected date event list with card rows.
  - Floating add action.
- States:
  - Base selected date state.
  - Event list showing default first three events for a crowded day.
- Interactions:
  - Navigate month previous/next.
  - Select day from grid.
  - Open add-event flow from floating action.
- Validation rules:
  - None on base calendar interaction.

### 2) Calendar - 4 and more events
- Purpose: expanded event list for a selected day with overflow.
- Primary content:
  - Same layout as base calendar.
  - Selected day contains 4+ event indicators.
  - Daily list renders additional events.
- States:
  - Expanded list for selected date with many events.
- Interactions:
  - Toggle between compact (first 3) and expanded event list for same selected day.
  - Continue month/day navigation.
- Validation rules:
  - None on read mode.

## Assumptions (pending approval)
1. Calendar is opened from projects via top-bar notifications action.
2. Repeated tap on the same selected day toggles compact/expanded list when more than three events exist.
3. Add-event modal from calendar reuses existing add-event flow and appends event locally.
4. Workweek view intentionally shows Monday-Friday only (matching design), weekends are omitted.
