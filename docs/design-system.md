# CRM Mobile Design System

## Global tokens (current baseline)

### Color tokens
- `bg.canvas`: `#e8edf4` (app background).
- `bg.surface`: `#ffffff` (cards, fields).
- `bg.info`: `#eaf2ff` (informational panel).
- `primary.500`: `#3d87f5` (primary CTA, active state).
- `primary.600`: `#2f78e5` (pressed primary CTA).
- `text.900`: `#1f2a37` (headings).
- `text.700`: `#556070` (body).
- `text.500`: `#8b96a8` (secondary text/placeholders).
- `border.200`: `#d7e0ec` (inputs/chips).
- `danger.500`: `#dc4c4c` (validation errors).
- `success.500`: `#37b26c` (positive task priority/state).
- `warning.500`: `#f2b233` (medium priority/state).
- `lavender.500`: `#8a74f6` (review status accents).
- `muted.400`: `#aab4c3` (disabled/secondary glyphs).
- `teal.500`: `#18bdd8` (vacation date selection accent).
- `slate.100`: `#eef3f9` (event modal utility button background).

### Spacing/radius/shadow tokens
- Spacing scale: `4, 8, 12, 16, 20, 24, 32`.
- Radius scale: `10, 14, 18, 24`.
- Shadow token for primary CTAs:
  - iOS: opacity `0.18`, radius `10`, offset `(0, 6)`.
  - Android: elevation `5`.

### Typography tokens
- Headline: `28 / 700`.
- Section title: `34 / 700`.
- Card title: `30 / 700`.
- Body: `16 / 500`.
- Label: `14 / 600`.
- Helper: `13 / 500`.

## Reusable components added for auth flows

1. `BrandHeader`
- Workroom brand lockup reused across signin/signup/success.

2. `AuthCard`
- Standard rounded white surface with consistent paddings.

3. `AuthTextField`
- Label + input shell.
- Error messaging.
- Optional right-side accessory node.

4. `PasswordField`
- Built on `AuthTextField`.
- Secure/visible toggle.

5. `SelectField`
- Pressable dropdown shell and modal-based option selection.

6. `OtpField`
- 4 one-character input boxes with auto-advance/backspace behavior.

7. `ChoiceChipGrid`
- Reusable chip selector for team-size options.

8. `RadioGroup`
- Reusable two-option yes/no style selector.

9. `PrimaryButton` and `TextButton`
- Shared CTA components for bottom actions and inline links.

10. `StepFooter`
- Reusable previous/next layout for wizard steps.

## Folder scope additions: `screens/signup-signin`

### Components to use in this folder
1. Sign-in form shell.
2. Sign-up step shell (`step index`, `title`, `body`, `footer actions`).
3. Input/select/otp/button primitives listed above.

### Token usage notes
1. Inputs share the same radius and border token for consistency.
2. Active selections and primary CTAs share `primary.500`.
3. Informational SMS card uses `bg.info` with primary text accents.

## Reusable components added for projects flows

1. `TopAppBar`
- Compact workspace bar with logo and utility actions.

2. `ProjectPicker`
- Active project selector with optional `View details` action.

3. `SectionPill`
- Rounded group label used for task group headers.

4. `TaskCard`
- Compact task summary card with metadata slots and status badge.

5. `StatusBadge`
- Color-coded status indicator (`Done`, `In Progress`, `In Review`, `To Do`).

6. `PriorityLabel`
- Priority indicator with arrow + semantic color.

7. `AvatarStack`
- Overlapping avatar chips for assignee/reporter display.

8. `FilterSheet`
- Modal filter container with checkbox groups, dropdown fields, and footer CTA.

9. `InfoCard`
- Generic rounded section card used in project/task detail pages.

10. `TimeTrackingModal`
- Reusable modal form shell for logging task effort.

## Folder scope additions: `screens/projects`

### Components to use in this folder
1. Project list shell with project context + grouped task sections.
2. Task card list item primitive (reused across list and group views).
3. Detail cards for project and task metadata.
4. Filter and time tracking modals.

### Token usage notes
1. Status and priority colors are semantic, not hardcoded per screen.
2. All cards use `bg.surface` + `border.200` for continuity with auth surfaces.
3. Floating actions and primary modal CTAs remain on `primary.500`.

## Reusable components added for my-profile flows

1. `ProfileTopBar`
- Header with logo and utility actions reused in profile/settings/vacation screens.

2. `ProfileHeaderCard`
- Avatar, name, role, and utility icon card.

3. `InfoField`
- Read-only/placeholder input shell used in profile info sections.

4. `ProfileTabs`
- Three-option segment switch (`Projects`, `Team`, `Vacations`).

5. `ProjectSummaryCard`
- Compact project metrics card for profile projects tab.

6. `TeamMemberCard`
- Team roster tile with role/seniority/status tag.

7. `VacationRequestCard`
- Request history row with status chip.

8. `RequestModal`
- Shared add-request shell with request-type radios and mode toggle.

9. `CalendarGrid`
- Lightweight reusable day grid with range/single-date selection styling.

10. `SettingsAccordion`
- Expandable settings groups with optional nested content.

11. `NotificationsSheet`
- Scrollable notification list modal.

## Folder scope additions: `screens/my-profile`

### Components to use in this folder
1. Profile scaffold with shared top bar and profile header card.
2. Shared field shell for info/contact sections.
3. Tabs + list cards for projects/team/vacations.
4. Add-request modal stack and settings/notifications panels.

### Token usage notes
1. Vacation selections use `teal.500` for highlighted days/ranges.
2. Validation callouts reuse `danger.500` on light background surfaces.
3. Settings toggles and primary actions remain on `primary.500`.

## Reusable components added for add-event flows

1. `EventFormField`
- Reusable labeled field shell for add-event form rows.

2. `EventSelectField`
- Pressable selector variant for category/priority/date/time.

3. `EventRepeatSwitch`
- On/off row for repeat toggle.

4. `RepeatCadenceTabs`
- Segmented control for `Daily/Weekly/Monthly`.

5. `WeekdayChipGroup`
- Multi-select weekday chips for recurrence pattern.

6. `EventOptionPicker`
- Modal option picker reused by form selectors.

7. `EventFormModal`
- Add-event modal wrapper with fixed header/footer behavior.

## Folder scope additions: `screens/add-event`

### Components to use in this folder
1. Single event form shell.
2. Repeat configuration sub-section components.
3. Shared save CTA and option picker modal.

### Token usage notes
1. Event form shells reuse `bg.surface` + `border.200`.
2. Repeat active states use `primary.500`.
3. Error labels use `danger.500` inline under fields.

## Reusable components added for add-project flows

1. `ProjectFormModal`
- Modal shell for add-project fields and avatar selector grid.

2. `TaskFormModal`
- Modal shell for add-task fields with selector rows.

3. `AvatarPresetGrid`
- Reusable selectable icon grid for project avatars.

4. `ProjectFormField`
- Labeled text/select field variant for project/task forms.

5. `EmptyProjectState`
- Reusable empty-state block (illustration + text + CTA guidance).

6. `ProjectQuickActions`
- Bottom icon row used in project/task create forms.

## Folder scope additions: `screens/add-project`

### Components to use in this folder
1. Add-project form and avatar selection primitives.
2. Add-task form primitives with shared selectors.
3. Empty-project state block integrated into projects list flow.

### Token usage notes
1. Form layouts reuse existing surface/input tokens for consistency.
2. Selected avatar preset uses `primary.500` outline/accent.
3. Empty-state illustration area keeps neutral background emphasis.

## Reusable components added for messenger flows

1. `ConversationListItem`
- Row primitive for group/direct chat items with unread badge and preview.

2. `MessageBubble`
- Reusable incoming/outgoing bubble with optional metadata actions.

3. `ComposerBar`
- Bottom composer with attach/link/mention/emoji/send controls.

4. `MentionSuggestions`
- Overlay list for mention autocomplete.

5. `MessageActionSheet`
- Bottom sheet action list for selected message.

6. `ChatSearchBar`
- In-thread search row with clear/dismiss affordances.

7. `ChatDetailsCard`
- Shared details header card for conversation info and quick actions.

8. `AccordionSection`
- Reusable expandable sections for members/files/media/links.

9. `MemberRow`
- Compact row item for member listing with optional online indicator.

10. `DetailsFileRow`
- File card row used in chat details `Files` section.

## Folder scope additions: `screens/messenger`

### Components to use in this folder
1. Conversation list shell and reusable row items.
2. Conversation thread primitives (bubbles, composer, search, actions).
3. Details view with accordion sections and member/file rows.

### Token usage notes
1. Chat input and bubble borders reuse `border.200` to match app surfaces.
2. Outgoing/link bubbles use light blue accents derived from `primary.500`.
3. Action sheet destructive action uses `danger.500`.

## Reusable components added for employees flows

1. `EmployeesTopBar`
- Workspace top bar reused across employee list/activity/profile states.

2. `EmployeesTabs`
- Two-state segment control for `List` and `Activity`.

3. `EmployeeListCard`
- Employee summary card with identity + metadata + position/seniority tag.

4. `EmployeeActivityCard`
- Compact workload card for backlog/in-progress/in-review metrics.

5. `EmployeeProfileTabs`
- Secondary segment switch for employee detail tabs.

6. `EmployeeProjectCard`
- Project summary card variant for employee profile context.

7. `VacationCard`
- Lightweight leave summary card for employee vacation tab.

8. `AddEmployeeModal`
- Modal shell for multi-email add-member flow with inline validation.

## Folder scope additions: `screens/employees`

### Components to use in this folder
1. Employee workspace scaffold (top bar, title, tabs, pagination, FAB).
2. Employee list/activity cards sharing metadata primitives.
3. Employee profile blocks (info fields, project/vacation summaries).
4. Add-employee modal and primary approve CTA.

### Token usage notes
1. Employee cards continue using `bg.surface` + `border.200` for consistency.
2. Tab and CTA active states stay on `primary.500`.
3. Validation/error labels use `danger.500`; approval status chips use `success.500`.

## Reusable components added for team-lead flows

1. `TaskStatusSheet`
- Bottom sheet with radio status selection and single approve CTA.

2. `ClaimTaskConfirmModal`
- Center modal confirming completion/claim action before final close.

3. `ReviewStatusPill`
- Compact status chip used in task details header for current review state.

## Folder scope additions: `screens/team-lead`

### Components to use in this folder
1. Team-lead task review screen scaffold (built on project primitives).
2. Status selection sheet for task lifecycle decisions.
3. Confirmation modal for irreversible `Done` transition.

### Token usage notes
1. Review status pill uses `lavender.500` accents for `In Review`.
2. Action/approval controls remain on `primary.500`.
3. Destructive-risk confirmation copy is presented in neutral surface with clear CTA emphasis.

## Reusable components added for info-portal flows

1. `PortalKpiCard`
- Summary card showing current projects and monthly growth.

2. `PortalFolderCard`
- Folder list card with color-coded icon, name, and page-count metadata.

3. `TaskSelectorCard`
- Compact selector card for technical-task context inside folder details.

4. `InfoSectionCard`
- Reusable long-form documentation section block.

5. `AttachmentRow`
- File attachment row with metadata and trailing actions placeholder.

6. `ShareFolderModal`
- Modal shell for dynamic member-sharing rows and share CTA.

7. `MemberPickerModal`
- Bottom-sheet picker for selecting members in share flow.

## Folder scope additions: `screens/info-portal`

### Components to use in this folder
1. Info portal home scaffold (top app bar, title, KPI, folder cards).
2. Folder detail scaffold (task selector, section cards, attachment rows).
3. Share modal stack (member rows + picker + submit CTA).

### Token usage notes
1. Folder icon tones use semantic accents (`yellow`, `green`, `blue`, `purple`) with neutral card surfaces.
2. Share modal actions remain on `primary.500` and error labels on `danger.500`.
3. Documentation text blocks preserve `text.700` for readability across long paragraphs.

## Reusable components added for calendar flows

1. `MonthGridCard`
- Workweek calendar grid with month navigation and selected-day styling.

2. `CalendarDayCell`
- Reusable day cell with event-dot indicators and selected state.

3. `CalendarEventCard`
- Daily event row with tone stripe, duration, and trend indicator.

4. `DailyEventsHeader`
- Selected-day heading for daily event list area.

## Folder scope additions: `screens/calendar`

### Components to use in this folder
1. Calendar home scaffold (top bar, month grid, daily list, FAB).
2. Workweek date-grid primitives with event indicators.
3. Daily event cards supporting compact and expanded lists.

### Token usage notes
1. Selected day border and month navigation accents use `primary.500`.
2. Event tones reuse semantic accents (`blue`, `purple`, `teal`, `pink`) while card surfaces remain neutral.
3. Event trend arrows keep `warning.500` (up) and `success.500` (down) for quick scan.

## Reusable components added for vacations flows

1. `VacationEmployeeCard`
- Employee leave-balance card with reusable metric columns.

## Folder scope additions: `screens/vacations`

### Components to use in this folder
1. Vacations list scaffold (top bar, title, stacked employee cards, FAB).
2. Employee balance card primitive for leave metrics.

### Token usage notes
1. Metrics keep neutral text hierarchy (`text.500` labels, `text.700` values) for quick scanning.
2. Cards remain on `bg.surface` with `border.200` for consistency with other list workspaces.

## Reusable components added for fab flows

1. `AddActionsSheet`
- Reusable bottom sheet that exposes global quick-add actions.

2. `AddActionRow`
- Icon + label row primitive inside the add-action sheet.

## Folder scope additions: `screens/fab`

### Components to use in this folder
1. Bottom-sheet add menu with six action rows.
2. Shared action model (`project`, `task`, `event`, `request`, `employee`, `info-folder`).

### Token usage notes
1. Sheet handle and neutral icon chips use soft slate backgrounds.
2. Row icon accents and action hierarchy continue using `primary.500`.
