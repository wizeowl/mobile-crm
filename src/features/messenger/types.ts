export type ConversationType = 'group' | 'direct';

export type MessageKind = 'text' | 'file' | 'link';

export interface MessengerMember {
  id: string;
  name: string;
  title?: string;
  avatarColor: string;
  online?: boolean;
}

export interface ConversationSummary {
  id: string;
  type: ConversationType;
  title: string;
  subtitle: string;
  lastMessagePreview: string;
  lastMessageTime: string;
  unreadCount: number;
  avatarColor: string;
  memberIds: string[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  timeLabel: string;
  kind: MessageKind;
  text?: string;
  fileName?: string;
  fileMeta?: string;
  linkLabel?: string;
}

export interface MessageAction {
  key: 'pin' | 'reply' | 'share' | 'edit' | 'delete';
  label: string;
  destructive?: boolean;
}

export interface ChatDetailsState {
  infoExpanded: boolean;
  membersExpanded: boolean;
  mediaExpanded: boolean;
  filesExpanded: boolean;
  linksExpanded: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  meta: string;
}

export interface MessengerSnapshot {
  currentUserId: string;
  members: MessengerMember[];
  groupConversations: ConversationSummary[];
  directConversations: ConversationSummary[];
  messages: ChatMessage[];
  files: FileItem[];
}
