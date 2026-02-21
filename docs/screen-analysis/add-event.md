# Add Event Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/add-event`

## Screens in this folder
1. `Add event.png`
2. `Add event - repeat.png`

## Screen-by-screen analysis

### 1) Add event
- Purpose: create a new event with core metadata.
- Primary content:
  - Event name input.
  - Event category selector.
  - Priority selector.
  - Date selector.
  - Time selector.
  - Description input.
  - `Repeat Event` toggle (off by default).
  - Primary CTA: `Save Event`.
- States:
  - Default (repeat disabled).
  - Input-focused states.
  - Validation errors.
  - Saving/submitting state.
- Interactions:
  - Fill base event fields.
  - Open selection pickers.
  - Toggle repeat on/off.
  - Submit event.
- Validation rules:
  - Event name required.
  - Category required.
  - Priority required.
  - Date required.
  - Time required.
  - Description optional.

### 2) Add event - repeat
- Purpose: configure recurring event schedule.
- Primary content:
  - All base event fields.
  - `Repeat Event` enabled.
  - Repeat cadence selector (`Daily`, `Weekly`, `Monthly`).
  - Day-of-week selectors.
  - `Repeat every day` checkbox.
  - Repeat time selector.
- States:
  - Repeat enabled.
  - Cadence selected.
  - One-or-many days selected.
  - `Repeat every day` checked state.
  - Validation error states for incomplete repeat setup.
- Interactions:
  - Choose cadence.
  - Toggle day chips.
  - Toggle `Repeat every day` (auto-select all days).
  - Set repeat time.
  - Submit event.
- Validation rules:
  - Base event rules still apply.
  - If repeat is enabled:
    - Repeat cadence required.
    - Repeat time required.
    - At least one weekday required unless `Repeat every day` is enabled.

## Assumptions (pending approval)
1. Description is optional.
2. `Repeat every day` auto-selects all weekdays for this UI scope.
3. Monthly cadence keeps same UI controls in dummy mode (no day-of-month selector in this pass).
