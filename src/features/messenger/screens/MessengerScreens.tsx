import { StyleSheet, Text, View } from 'react-native';

import {
  AccordionRow,
  ActionRow,
  BackLink,
  BottomSheet,
  ChatHeaderCard,
  ComposerBar,
  ConversationListItem,
  ConversationsCard,
  ConversationsHeader,
  DatePill,
  DetailsHeaderCard,
  FileRow,
  FloatingAddButton,
  HeaderTitle,
  MemberRow,
  MentionSuggestions,
  MessageBubble,
  MessengerLayout,
  MessengerTopBar,
  SearchRow,
  SectionLabel,
  TypingIndicator,
} from '../components/MessengerPrimitives';
import {
  ChatDetailsState,
  ChatMessage,
  ConversationSummary,
  FileItem,
  MessageAction,
  MessengerMember,
} from '../types';
import { colors, radii, spacing } from '../../../theme/tokens';

interface MessengerHomeScreenProps {
  groupConversations: ConversationSummary[];
  directConversations: ConversationSummary[];
  listSearchOpen: boolean;
  listSearchQuery: string;
  onChangeListSearch: (value: string) => void;
  onClearListSearch: () => void;
  onToggleListSearch: () => void;
  onOpenConversation: (conversationId: string) => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onStartConversation: () => void;
}

interface ConversationScreenProps {
  conversation: ConversationSummary;
  membersById: Record<string, MessengerMember>;
  currentUserId: string;
  messages: ChatMessage[];
  chatSearchOpen: boolean;
  chatSearchQuery: string;
  onToggleChatSearch: () => void;
  onChangeChatSearch: (value: string) => void;
  onClearChatSearch: () => void;
  draft: string;
  mentionChip: string | null;
  mentionOpen: boolean;
  mentionSuggestions: Array<{ id: string; name: string; avatarColor: string }>;
  showTyping: boolean;
  editing: boolean;
  onPickMention: (memberId: string) => void;
  onDraftChange: (value: string) => void;
  onAttach: () => void;
  onLink: () => void;
  onMention: () => void;
  onEmoji: () => void;
  onSend: () => void;
  onRemoveMention: () => void;
  onCancelEdit: () => void;
  onOpenMessageActions: (messageId: string) => void;
  onBack: () => void;
  onOpenDetails: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

interface MessageActionsSheetProps {
  visible: boolean;
  title: string;
  actions: MessageAction[];
  onClose: () => void;
  onPressAction: (action: MessageAction['key']) => void;
}

interface ChatDetailsScreenProps {
  conversation: ConversationSummary;
  members: MessengerMember[];
  files: FileItem[];
  links: string[];
  state: ChatDetailsState;
  onToggleState: (section: keyof ChatDetailsState) => void;
  onBack: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export function MessengerHomeScreen({
  groupConversations,
  directConversations,
  listSearchOpen,
  listSearchQuery,
  onChangeListSearch,
  onClearListSearch,
  onToggleListSearch,
  onOpenConversation,
  onOpenNotifications,
  onOpenProfile,
  onStartConversation,
}: MessengerHomeScreenProps) {
  return (
    <MessengerLayout>
      <MessengerTopBar onSearch={onToggleListSearch} onNotifications={onOpenNotifications} onProfile={onOpenProfile} />
      <HeaderTitle title="Messenger" />

      <ConversationsCard>
        <ConversationsHeader onSearch={onToggleListSearch} onAdd={onStartConversation} />
        {listSearchOpen ? (
          <View style={styles.listSearchRowWrap}>
            <SearchRow
              value={listSearchQuery}
              placeholder="Search conversations"
              onChange={onChangeListSearch}
              onClear={onClearListSearch}
            />
          </View>
        ) : null}

        <SectionLabel label="Groups" />
        {groupConversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            title={conversation.title}
            preview={conversation.lastMessagePreview}
            time={conversation.lastMessageTime}
            unread={conversation.unreadCount}
            avatarColor={conversation.avatarColor}
            onPress={() => onOpenConversation(conversation.id)}
          />
        ))}

        <SectionLabel label="Direct Messages" />
        {directConversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            title={conversation.title}
            preview={conversation.lastMessagePreview}
            time={conversation.lastMessageTime}
            unread={conversation.unreadCount}
            avatarColor={conversation.avatarColor}
            onPress={() => onOpenConversation(conversation.id)}
          />
        ))}
      </ConversationsCard>

      <FloatingAddButton onPress={onStartConversation} />
    </MessengerLayout>
  );
}

export function ConversationScreen({
  conversation,
  membersById,
  currentUserId,
  messages,
  chatSearchOpen,
  chatSearchQuery,
  onToggleChatSearch,
  onChangeChatSearch,
  onClearChatSearch,
  draft,
  mentionChip,
  mentionOpen,
  mentionSuggestions,
  showTyping,
  editing,
  onPickMention,
  onDraftChange,
  onAttach,
  onLink,
  onMention,
  onEmoji,
  onSend,
  onRemoveMention,
  onCancelEdit,
  onOpenMessageActions,
  onBack,
  onOpenDetails,
  onOpenNotifications,
  onOpenProfile,
}: ConversationScreenProps) {
  return (
    <MessengerLayout>
      <MessengerTopBar onSearch={onToggleChatSearch} onNotifications={onOpenNotifications} onProfile={onOpenProfile} />
      <BackLink label="Back to Messenger" onPress={onBack} />
      <Text style={styles.pageTitle}>Conversation</Text>

      {chatSearchOpen ? (
        <SearchRow
          value={chatSearchQuery}
          placeholder="Search"
          onChange={onChangeChatSearch}
          onClear={onClearChatSearch}
        />
      ) : (
        <ChatHeaderCard
          title={conversation.title}
          subtitle={conversation.subtitle}
          avatarColor={conversation.avatarColor}
          onPressDetails={onOpenDetails}
        />
      )}

      <DatePill text="Friday, September 8" />

      <View style={styles.messagesWrap}>
        {messages.length === 0 ? (
          <Text style={styles.emptyStateText}>No messages found for this search.</Text>
        ) : (
          messages.map((message) => {
            const sender = membersById[message.senderId];

            return (
              <MessageBubble
                key={message.id}
                senderName={message.senderId === currentUserId ? 'You' : sender?.name ?? 'Unknown'}
                timeLabel={message.timeLabel}
                kind={message.kind}
                text={message.text}
                fileName={message.fileName}
                fileMeta={message.fileMeta}
                linkLabel={message.linkLabel}
                isOwn={message.senderId === currentUserId}
                onLongPress={() => onOpenMessageActions(message.id)}
              />
            );
          })
        )}
      </View>

      <MentionSuggestions visible={mentionOpen} suggestions={mentionSuggestions} onPick={onPickMention} />

      {showTyping ? <TypingIndicator text="Oscar Holloway is typing..." /> : null}

      <ComposerBar
        draft={draft}
        onDraftChange={onDraftChange}
        onAttach={onAttach}
        onLink={onLink}
        onMention={onMention}
        onEmoji={onEmoji}
        onSend={onSend}
        mentionChip={mentionChip}
        onRemoveMention={onRemoveMention}
        editing={editing}
        onCancelEdit={onCancelEdit}
      />
    </MessengerLayout>
  );
}

export function MessageActionsSheet({
  visible,
  title,
  actions,
  onClose,
  onPressAction,
}: MessageActionsSheetProps) {
  return (
    <BottomSheet visible={visible} title={title} onClose={onClose}>
      {actions.map((action) => (
        <ActionRow
          key={action.key}
          label={action.label}
          destructive={action.destructive}
          onPress={() => onPressAction(action.key)}
        />
      ))}
    </BottomSheet>
  );
}

export function ChatDetailsScreen({
  conversation,
  members,
  files,
  links,
  state,
  onToggleState,
  onBack,
  onOpenNotifications,
  onOpenProfile,
}: ChatDetailsScreenProps) {
  return (
    <MessengerLayout>
      <MessengerTopBar onNotifications={onOpenNotifications} onProfile={onOpenProfile} />
      <BackLink label="Back to Conversation" onPress={onBack} />
      <Text style={styles.pageTitle}>Chat Details</Text>

      <DetailsHeaderCard title={conversation.title} avatarColor={conversation.avatarColor} />

      <ConversationsCard>
        <AccordionRow
          icon="i"
          label="Info"
          expanded={state.infoExpanded}
          onToggle={() => onToggleState('infoExpanded')}
        >
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About this chat</Text>
            <Text style={styles.infoBody}>
              Dummy chat metadata is shown here. Backend integration is intentionally disabled.
            </Text>
          </View>
        </AccordionRow>

        <AccordionRow
          icon="M"
          label="Members"
          expanded={state.membersExpanded}
          onToggle={() => onToggleState('membersExpanded')}
        >
          {members.map((member) => (
            <MemberRow
              key={member.id}
              name={member.name}
              avatarColor={member.avatarColor}
              online={member.online}
            />
          ))}
        </AccordionRow>

        <AccordionRow
          icon="P"
          label="Media"
          expanded={state.mediaExpanded}
          onToggle={() => onToggleState('mediaExpanded')}
        >
          <Text style={styles.placeholderText}>No media in dummy data.</Text>
        </AccordionRow>

        <AccordionRow
          icon="A"
          label="Files"
          expanded={state.filesExpanded}
          onToggle={() => onToggleState('filesExpanded')}
        >
          {files.length === 0 ? (
            <Text style={styles.placeholderText}>No files in this conversation.</Text>
          ) : (
            files.map((file) => <FileRow key={file.id} name={file.name} meta={file.meta} />)
          )}
        </AccordionRow>

        <AccordionRow
          icon="L"
          label="Links"
          expanded={state.linksExpanded}
          onToggle={() => onToggleState('linksExpanded')}
        >
          {links.length === 0 ? (
            <Text style={styles.placeholderText}>No links shared yet.</Text>
          ) : (
            links.map((link, index) => (
              <View key={`${link}-${index}`} style={styles.linkRow}>
                <Text style={styles.linkText}>{link}</Text>
              </View>
            ))
          )}
        </AccordionRow>
      </ConversationsCard>
    </MessengerLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
  },
  listSearchRowWrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  messagesWrap: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  emptyStateText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  infoCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f8fbff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 4,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  infoBody: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  linkRow: {
    borderRadius: radii.md,
    backgroundColor: '#dff4ff',
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  linkText: {
    color: '#13a7cf',
    fontSize: 15,
    fontWeight: '700',
  },
});
