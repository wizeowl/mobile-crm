# Messenger Screen Analysis

## Folder scope
`/Users/Nidhal.Ben.Taher/Developer/crm/screens/messenger`

## Screens in this folder
1. `Messenger.png`
2. `Messenger - entering.png`
3. `Messenger - someone is typing.png`
4. `Messenger - mention someone.png`
5. `Messenger - mentioned user.png`
6. `Messenger - attached file.png`
7. `Messenger - link.png`
8. `Messenger - search in chat.png`
9. `Messenger - actions with messege.png`
10. `Messenger - edit messege.png`
11. `Messenger - details.png`
12. `Messenger - details - members.png`
13. `Messenger - details - files.png`

## Screen-by-screen analysis

### 1) Messenger (chat list)
- Purpose: entry point to conversations grouped by channels and direct messages.
- Primary content:
  - `Conversations` header with search and add icons.
  - Grouped section (`Groups`) with unread counters.
  - Grouped section (`Direct Messages`) with latest message preview and timestamp.
  - Floating add action.
- States:
  - Default grouped list.
  - Unread badges shown/hidden per row.
- Interactions:
  - Open a conversation thread.
  - Search/filter conversation list.
  - Start new conversation/channel (placeholder).
- Validation rules:
  - None.

### 2) Messenger - entering
- Purpose: active chat thread while user types.
- Primary content:
  - Back link to messenger list.
  - Conversation header (name + online status).
  - Message timeline.
  - Composer with text input and action icons.
- States:
  - Input focused and keyboard shown.
  - Text currently entered.
- Interactions:
  - Type/send message.
  - Attach file.
  - Add link.
  - Trigger mention mode.
  - Emoji placeholder action.
- Validation rules:
  - Empty message should not submit unless attachment/link payload exists.

### 3) Messenger - someone is typing
- Purpose: show typing indicator from other participant.
- Primary content:
  - Same chat thread layout.
  - Inline typing status text near composer.
- States:
  - Typing indicator visible/invisible.
- Interactions:
  - Continue messaging while indicator updates.
- Validation rules:
  - None.

### 4) Messenger - mention someone
- Purpose: mention autocomplete state while typing `@`.
- Primary content:
  - Mention suggestion dropdown list over chat.
- States:
  - Mention panel open with filtered candidates.
- Interactions:
  - Select mention candidate.
  - Continue composing message.
- Validation rules:
  - Mention token must reference known participant.

### 5) Messenger - mentioned user
- Purpose: composer with inserted mention token.
- Primary content:
  - Mention pill/tag inside input text.
- States:
  - Mention token rendered in highlighted style.
- Interactions:
  - Continue editing message.
  - Send message including mention metadata.
- Validation rules:
  - Mention pill removable/re-editable.

### 6) Messenger - attached file
- Purpose: conversation containing file attachment message.
- Primary content:
  - File bubble with filename, size/type, and action menu icon.
- States:
  - File message displayed in timeline.
- Interactions:
  - Open attachment.
  - Open file actions menu (placeholder).
- Validation rules:
  - Attachment metadata required when sending file message.

### 7) Messenger - link
- Purpose: conversation containing link preview bubble.
- Primary content:
  - Link bubble with icon and label.
- States:
  - Link message rendered.
- Interactions:
  - Open link (placeholder in dummy mode).
- Validation rules:
  - URL/text link required for link message.

### 8) Messenger - search in chat
- Purpose: in-thread message search UI.
- Primary content:
  - Search bar replacing regular conversation header block.
  - Clear/close search icon.
- States:
  - Search mode on/off.
  - Query empty/non-empty.
- Interactions:
  - Enter search term.
  - Filter/highlight message results.
  - Exit search mode.
- Validation rules:
  - None.

### 9) Messenger - actions with message
- Purpose: bottom sheet of per-message actions.
- Primary content:
  - Actions list: pin, reply, share, edit, delete.
- States:
  - Action sheet visible/hidden.
- Interactions:
  - Select message action.
  - Dismiss sheet.
- Validation rules:
  - `Edit/Delete` should apply only to editable messages (assumed own messages).

### 10) Messenger - edit message
- Purpose: composer in editing mode for existing message.
- Primary content:
  - Mention/token context + existing text in composer.
  - Cancel-edit icon.
- States:
  - Editing active/inactive.
- Interactions:
  - Modify message text.
  - Save edits.
  - Cancel edit.
- Validation rules:
  - Edited message should not become empty.

### 11) Messenger - details
- Purpose: chat details overview.
- Primary content:
  - Chat avatar/title.
  - Top utility icons.
  - Accordion sections: info, members, media, files, links.
- States:
  - All sections collapsed by default.
- Interactions:
  - Expand/collapse detail sections.
- Validation rules:
  - None.

### 12) Messenger - details - members
- Purpose: members section expanded.
- Primary content:
  - Member list with status dots and labels.
- States:
  - Members section expanded.
- Interactions:
  - View members.
  - Member actions placeholder.
- Validation rules:
  - None.

### 13) Messenger - details - files
- Purpose: files section expanded.
- Primary content:
  - File cards with name/type metadata.
- States:
  - Files section expanded.
- Interactions:
  - Open file card.
- Validation rules:
  - None.

## Assumptions (pending approval)
1. Message action sheet `Edit/Delete` is enabled only for messages authored by current user.
2. Search-in-chat is client-side filtering over loaded dummy messages.
3. Link and attachment actions are placeholder-only (no real file/link open integration).
4. Mention suggestions are restricted to current conversation members.
