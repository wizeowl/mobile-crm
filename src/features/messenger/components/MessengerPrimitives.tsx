import { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, radii, shadows, spacing } from '../../../theme/tokens';

interface MessengerLayoutProps {
  children: ReactNode;
}

interface TopBarProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}

interface HeaderTitleProps {
  title: string;
}

interface BackLinkProps {
  label: string;
  onPress: () => void;
}

interface ConversationListItemProps {
  title: string;
  preview: string;
  time: string;
  unread: number;
  avatarColor: string;
  onPress: () => void;
}

interface SectionLabelProps {
  label: string;
}

interface SearchRowProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

interface ChatHeaderCardProps {
  title: string;
  subtitle: string;
  avatarColor: string;
  onPressDetails?: () => void;
}

interface DatePillProps {
  text: string;
}

interface MessageBubbleProps {
  senderName: string;
  timeLabel: string;
  text?: string;
  kind: 'text' | 'file' | 'link';
  fileName?: string;
  fileMeta?: string;
  linkLabel?: string;
  isOwn: boolean;
  onLongPress?: () => void;
}

interface TypingIndicatorProps {
  text: string;
}

interface MentionSuggestionsProps {
  visible: boolean;
  suggestions: Array<{ id: string; name: string; avatarColor: string }>;
  onPick: (id: string) => void;
}

interface ComposerBarProps {
  draft: string;
  onDraftChange: (value: string) => void;
  onAttach: () => void;
  onLink: () => void;
  onMention: () => void;
  onEmoji: () => void;
  onSend: () => void;
  mentionChip?: string | null;
  onRemoveMention?: () => void;
  editing?: boolean;
  onCancelEdit?: () => void;
}

interface BottomSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

interface ActionRowProps {
  label: string;
  destructive?: boolean;
  onPress: () => void;
}

interface DetailsHeaderCardProps {
  title: string;
  avatarColor: string;
}

interface AccordionRowProps {
  icon: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

interface MemberRowProps {
  name: string;
  avatarColor: string;
  online?: boolean;
}

interface FileRowProps {
  name: string;
  meta: string;
}

export function MessengerLayout({ children }: MessengerLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function MessengerTopBar({ onSearch, onNotifications, onProfile }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>W</Text>
      </View>

      <View style={styles.topActions}>
        <TopIconButton label="S" onPress={onSearch} />
        <TopIconButton label="N" onPress={onNotifications} />
        <TopIconButton label="P" onPress={onProfile} avatar />
      </View>
    </View>
  );
}

export function HeaderTitle({ title }: HeaderTitleProps) {
  return <Text style={styles.headerTitle}>{title}</Text>;
}

export function BackLink({ label, onPress }: BackLinkProps) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.backLink}>{`<- ${label}`}</Text>
    </Pressable>
  );
}

export function ConversationsCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function ConversationsHeader({ onSearch, onAdd }: { onSearch: () => void; onAdd: () => void }) {
  return (
    <View style={styles.conversationHeaderRow}>
      <Text style={styles.conversationsTitle}>Conversations</Text>
      <View style={styles.conversationHeaderActions}>
        <TopIconButton label="S" onPress={onSearch} />
        <TopIconButton label="+" onPress={onAdd} primary />
      </View>
    </View>
  );
}

export function SectionLabel({ label }: SectionLabelProps) {
  return <Text style={styles.sectionLabel}>{`v ${label}`}</Text>;
}

export function ConversationListItem({
  title,
  preview,
  time,
  unread,
  avatarColor,
  onPress,
}: ConversationListItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.conversationItem}>
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{title.charAt(0)}</Text>
      </View>

      <View style={styles.conversationTextWrap}>
        <Text style={styles.conversationTitle}>{title}</Text>
        <Text style={styles.conversationPreview} numberOfLines={1}>
          {preview}
        </Text>
      </View>

      <View style={styles.conversationMetaWrap}>
        <Text style={styles.timeText}>{time}</Text>
        {unread > 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unread}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

export function SearchRow({ value, placeholder, onChange, onClear }: SearchRowProps) {
  return (
    <View style={styles.searchRow}>
      <Text style={styles.searchIcon}>S</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder ?? 'Search'}
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
      />
      <Pressable onPress={onClear} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>x</Text>
      </Pressable>
    </View>
  );
}

export function ChatHeaderCard({ title, subtitle, avatarColor, onPressDetails }: ChatHeaderCardProps) {
  return (
    <Pressable onPress={onPressDetails} style={styles.chatHeaderCard}>
      <View style={[styles.avatarLarge, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{title.charAt(0)}</Text>
      </View>

      <View style={styles.chatHeaderTextWrap}>
        <Text style={styles.chatHeaderTitle}>{title}</Text>
        <Text style={styles.chatHeaderSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

export function DatePill({ text }: DatePillProps) {
  return (
    <View style={styles.datePill}>
      <Text style={styles.datePillText}>{text}</Text>
    </View>
  );
}

export function MessageBubble({
  senderName,
  timeLabel,
  text,
  kind,
  fileName,
  fileMeta,
  linkLabel,
  isOwn,
  onLongPress,
}: MessageBubbleProps) {
  return (
    <Pressable onLongPress={onLongPress} style={styles.messageRow}>
      <View style={[styles.messageAvatar, isOwn && styles.messageAvatarOwn]}>
        <Text style={styles.messageAvatarText}>{senderName.charAt(0)}</Text>
      </View>

      <View style={styles.messageContentWrap}>
        <Text style={styles.messageMeta}>{`${senderName} ${timeLabel}`}</Text>

        {kind === 'text' ? <Text style={styles.messageText}>{text}</Text> : null}

        {kind === 'file' ? (
          <View style={styles.fileBubble}>
            <Text style={styles.fileName}>{fileName}</Text>
            <Text style={styles.fileMeta}>{fileMeta}</Text>
          </View>
        ) : null}

        {kind === 'link' ? (
          <View style={styles.linkBubble}>
            <Text style={styles.linkIcon}>L</Text>
            <Text style={styles.linkLabel}>{linkLabel}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

export function TypingIndicator({ text }: TypingIndicatorProps) {
  return <Text style={styles.typingText}>{text}</Text>;
}

export function MentionSuggestions({ visible, suggestions, onPick }: MentionSuggestionsProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.mentionPanel}>
      {suggestions.map((suggestion) => (
        <Pressable key={suggestion.id} onPress={() => onPick(suggestion.id)} style={styles.mentionRow}>
          <View style={[styles.avatarSmall, { backgroundColor: suggestion.avatarColor }]}>
            <Text style={styles.avatarText}>{suggestion.name.charAt(0)}</Text>
          </View>
          <Text style={styles.mentionName}>{suggestion.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function ComposerBar({
  draft,
  onDraftChange,
  onAttach,
  onLink,
  onMention,
  onEmoji,
  onSend,
  mentionChip,
  onRemoveMention,
  editing,
  onCancelEdit,
}: ComposerBarProps) {
  return (
    <View style={styles.composerWrap}>
      <View style={styles.composerInputWrap}>
        {mentionChip ? (
          <Pressable onPress={onRemoveMention} style={styles.mentionChip}>
            <Text style={styles.mentionChipText}>{`@${mentionChip}`}</Text>
          </Pressable>
        ) : null}

        <TextInput
          value={draft}
          onChangeText={onDraftChange}
          placeholder="Type your message here..."
          placeholderTextColor={colors.textMuted}
          style={styles.composerInput}
          multiline
        />

        {editing && onCancelEdit ? (
          <Pressable onPress={onCancelEdit} style={styles.cancelEditButton}>
            <Text style={styles.cancelEditText}>x</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.composerActionsRow}>
        <Pressable onPress={onAttach}>
          <Text style={styles.actionIcon}>A</Text>
        </Pressable>
        <Pressable onPress={onLink}>
          <Text style={styles.actionIcon}>L</Text>
        </Pressable>
        <Pressable onPress={onMention}>
          <Text style={styles.actionIcon}>@</Text>
        </Pressable>
        <Pressable onPress={onEmoji}>
          <Text style={styles.actionIcon}>:) </Text>
        </Pressable>
        <Pressable onPress={onSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>{'->'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function BottomSheet({ visible, title, onClose, children }: BottomSheetProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetOverlay} onPress={onClose}>
        <Pressable style={styles.sheetCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>{title}</Text>
          <View style={styles.sheetContent}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function ActionRow({ label, destructive, onPress }: ActionRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.actionRow}>
      <Text style={[styles.actionRowText, destructive && styles.actionRowTextDanger]}>{label}</Text>
    </Pressable>
  );
}

export function DetailsHeaderCard({ title, avatarColor }: DetailsHeaderCardProps) {
  return (
    <View style={styles.detailsHeaderCard}>
      <View style={[styles.detailsAvatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{title.charAt(0)}</Text>
      </View>
      <Text style={styles.detailsTitle}>{title}</Text>

      <View style={styles.detailsActionsRow}>
        <TopIconButton label="S" />
        <TopIconButton label="M" />
        <TopIconButton label="..." />
      </View>
    </View>
  );
}

export function AccordionRow({ icon, label, expanded, onToggle, children }: AccordionRowProps) {
  return (
    <View style={styles.accordionWrap}>
      <Pressable onPress={onToggle} style={styles.accordionHeader}>
        <Text style={styles.accordionIcon}>{icon}</Text>
        <Text style={styles.accordionLabel}>{label}</Text>
        <Text style={styles.accordionChevron}>{expanded ? '^' : 'v'}</Text>
      </Pressable>
      {expanded ? <View style={styles.accordionContent}>{children}</View> : null}
    </View>
  );
}

export function MemberRow({ name, avatarColor, online }: MemberRowProps) {
  return (
    <View style={styles.memberRow}>
      <View style={[styles.avatarSmall, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>
      <Text style={styles.memberName}>{name}</Text>
      {online ? <View style={styles.onlineDot} /> : null}
    </View>
  );
}

export function FileRow({ name, meta }: FileRowProps) {
  return (
    <View style={styles.detailsFileRow}>
      <View style={styles.fileIconWrap}>
        <Text style={styles.fileIconText}>A</Text>
      </View>
      <View>
        <Text style={styles.fileName}>{name}</Text>
        <Text style={styles.fileMeta}>{meta}</Text>
      </View>
    </View>
  );
}

export function FloatingAddButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <Text style={styles.fabText}>+</Text>
    </Pressable>
  );
}

function TopIconButton({
  label,
  onPress,
  avatar,
  primary,
}: {
  label: string;
  onPress?: () => void;
  avatar?: boolean;
  primary?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.topIconButton, avatar && styles.avatarTopButton, primary && styles.primaryIconButton]}
    >
      <Text style={[styles.topIconText, avatar && styles.avatarTopText, primary && styles.primaryIconText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 88,
    gap: spacing.md,
  },
  topBar: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  topIconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f6fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTopButton: {
    backgroundColor: '#f2eecf',
  },
  primaryIconButton: {
    backgroundColor: colors.primary,
  },
  topIconText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  avatarTopText: {
    color: '#9e8f65',
  },
  primaryIconText: {
    color: colors.surface,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  backLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    overflow: 'hidden',
  },
  conversationHeaderRow: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationsTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  conversationHeaderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sectionLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#182331',
    fontSize: 12,
    fontWeight: '700',
  },
  conversationTextWrap: {
    flex: 1,
    gap: 2,
  },
  conversationTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  conversationPreview: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  conversationMetaWrap: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  unreadBadge: {
    minWidth: 18,
    minHeight: 18,
    borderRadius: 9,
    backgroundColor: '#ff5b6f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  unreadText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: '700',
  },
  searchRow: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  searchIcon: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  chatHeaderCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarLarge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatHeaderTextWrap: {
    flex: 1,
    gap: 2,
  },
  chatHeaderTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  chatHeaderSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  datePill: {
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  datePillText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0cee0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  messageAvatarOwn: {
    backgroundColor: '#f2eecf',
  },
  messageAvatarText: {
    color: '#253244',
    fontSize: 10,
    fontWeight: '700',
  },
  messageContentWrap: {
    flex: 1,
    gap: 2,
  },
  messageMeta: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  messageText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  fileBubble: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f8fbff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 2,
    maxWidth: 220,
  },
  fileName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  fileMeta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  linkBubble: {
    borderRadius: radii.md,
    backgroundColor: '#dff4ff',
    paddingHorizontal: spacing.md,
    minHeight: 36,
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    alignSelf: 'flex-start',
  },
  linkIcon: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  linkLabel: {
    color: '#13a7cf',
    fontSize: 16,
    fontWeight: '700',
  },
  typingText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  mentionPanel: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  mentionRow: {
    borderRadius: radii.md,
    minHeight: 36,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mentionName: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  composerWrap: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  composerInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  mentionChip: {
    borderRadius: radii.sm,
    backgroundColor: '#d4e8ff',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  mentionChipText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  composerInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    minHeight: 24,
  },
  cancelEditButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelEditText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  composerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  actionIcon: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  sendButton: {
    marginLeft: 'auto',
    width: 44,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.25)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    backgroundColor: colors.surface,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  sheetHandle: {
    width: 72,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d6dee9',
    alignSelf: 'center',
  },
  sheetTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '700',
  },
  sheetContent: {
    gap: spacing.sm,
  },
  actionRow: {
    minHeight: 40,
    justifyContent: 'center',
  },
  actionRowText: {
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: '500',
  },
  actionRowTextDanger: {
    color: colors.danger,
  },
  detailsHeaderCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailsAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  detailsActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  accordionWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  accordionIcon: {
    color: colors.textSecondary,
    width: 18,
    fontSize: 12,
    fontWeight: '700',
  },
  accordionLabel: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  accordionChevron: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  accordionContent: {
    gap: spacing.sm,
    paddingLeft: spacing.xxl,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  memberName: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#32c96e',
    marginLeft: 'auto',
  },
  detailsFileRow: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f8fbff',
    minHeight: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fileIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e4f0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIconText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  fabText: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '700',
    marginTop: -1,
  },
});
