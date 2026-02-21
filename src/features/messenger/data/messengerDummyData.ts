import { ChatMessage, ConversationSummary, FileItem, MessengerMember, MessengerSnapshot } from '../types';

export const members: MessengerMember[] = [
  { id: 'me', name: 'Evan Yates', title: 'UI/UX Designer', avatarColor: '#f0d9a4', online: true },
  { id: 'oscar', name: 'Oscar Holloway', title: 'UI/UX Designer', avatarColor: '#d9a175', online: true },
  { id: 'olive', name: 'Olive Dixon', title: 'Product Designer', avatarColor: '#f5aac2' },
  { id: 'caroline', name: 'Caroline Santos', title: 'Product Manager', avatarColor: '#e3a76b' },
  { id: 'leon', name: 'Leon Nunez', title: 'QA Engineer', avatarColor: '#1e1f25' },
  { id: 'ralph', name: 'Ralph Harris', title: 'Backend Engineer', avatarColor: '#3f3f3f' },
  { id: 'garrett', name: 'Garrett Watson', title: 'UX Researcher', avatarColor: '#6b8292' },
  { id: 'blake', name: 'Blake Silva', title: 'iOS Developer', avatarColor: '#6faad7' },
  { id: 'carolyn', name: 'Carolyn Allen', title: 'Developer', avatarColor: '#d5b6a4' },
  { id: 'gregory', name: 'Gregory Alvarez', title: 'Developer', avatarColor: '#7fbcd2' },
  { id: 'kathryn', name: 'Kathryn Reese', title: 'Designer', avatarColor: '#efb4bf' },
  { id: 'bernard', name: 'Bernard Bass', title: 'QA', avatarColor: '#4c6173' },
  { id: 'ellen', name: 'Ellen Wong', title: 'Developer', avatarColor: '#88b3de' },
  { id: 'lily', name: 'Lily Bradley', title: 'Designer', avatarColor: '#f2b7b9' },
  { id: 'gerald', name: 'Gerald Ingram', title: 'Manager', avatarColor: '#9ac0d8' },
];

export const groupConversations: ConversationSummary[] = [
  {
    id: 'c-medical-team',
    type: 'group',
    title: 'Medical App Team',
    subtitle: '6 members',
    lastMessagePreview: "Caroline: Hi guys! I've shared yo...",
    lastMessageTime: '12:04',
    unreadCount: 12,
    avatarColor: '#2dc188',
    memberIds: ['me', 'oscar', 'olive', 'blake', 'ellen', 'lily', 'gerald'],
  },
  {
    id: 'c-food-service',
    type: 'group',
    title: 'Food Delivery Service',
    subtitle: '5 members',
    lastMessagePreview: "Olive: Hi guys! I've shared yo...",
    lastMessageTime: '12:04',
    unreadCount: 1,
    avatarColor: '#e5b16a',
    memberIds: ['me', 'olive', 'caroline', 'leon', 'ralph'],
  },
];

export const directConversations: ConversationSummary[] = [
  {
    id: 'c-garrett',
    type: 'direct',
    title: 'Garrett Watson',
    subtitle: 'UX Researcher',
    lastMessagePreview: 'Hi! Please, change the statu...',
    lastMessageTime: '12:04',
    unreadCount: 0,
    avatarColor: '#6b8292',
    memberIds: ['me', 'garrett'],
  },
  {
    id: 'c-caroline',
    type: 'direct',
    title: 'Caroline Santos',
    subtitle: 'Product Manager',
    lastMessagePreview: 'Hi! Please, change the statu...',
    lastMessageTime: '12:04',
    unreadCount: 0,
    avatarColor: '#e3a76b',
    memberIds: ['me', 'caroline'],
  },
  {
    id: 'c-leon',
    type: 'direct',
    title: 'Leon Nunez',
    subtitle: 'QA Engineer',
    lastMessagePreview: 'Hi! Please, change the statu...',
    lastMessageTime: '12:04',
    unreadCount: 0,
    avatarColor: '#1e1f25',
    memberIds: ['me', 'leon'],
  },
  {
    id: 'c-oscar',
    type: 'direct',
    title: 'Oscar Holloway',
    subtitle: 'UI/UX Designer',
    lastMessagePreview: 'Hi! Please, change the status in...',
    lastMessageTime: '12:04',
    unreadCount: 0,
    avatarColor: '#d9a175',
    memberIds: ['me', 'oscar'],
  },
  {
    id: 'c-ralph',
    type: 'direct',
    title: 'Ralph Harris',
    subtitle: 'Backend Engineer',
    lastMessagePreview: 'Hi! Please, change the statu...',
    lastMessageTime: '12:04',
    unreadCount: 0,
    avatarColor: '#3f3f3f',
    memberIds: ['me', 'ralph'],
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'm-1',
    conversationId: 'c-medical-team',
    senderId: 'olive',
    kind: 'text',
    timeLabel: '12:04 AM',
    text: 'Hi, Evan! Nice to meet you too. I will send you all the files I have for this project.',
  },
  {
    id: 'm-2',
    conversationId: 'c-medical-team',
    senderId: 'me',
    kind: 'text',
    timeLabel: '12:15 AM',
    text: 'Hi, Oscar! Nice to meet you. We will work with new project together.',
  },
  {
    id: 'm-3',
    conversationId: 'c-medical-team',
    senderId: 'olive',
    kind: 'text',
    timeLabel: '12:04 AM',
    text: 'Hi! Please, change the status in this task.',
  },
  {
    id: 'm-4',
    conversationId: 'c-medical-team',
    senderId: 'olive',
    kind: 'link',
    timeLabel: '12:04 AM',
    linkLabel: 'UX Login + Registration',
  },
  {
    id: 'm-5',
    conversationId: 'c-oscar',
    senderId: 'olive',
    kind: 'text',
    timeLabel: '12:04 AM',
    text: 'Hi, Evan! Nice to meet you too. I will send you all the files I have for this project.',
  },
  {
    id: 'm-6',
    conversationId: 'c-oscar',
    senderId: 'me',
    kind: 'text',
    timeLabel: '12:15 AM',
    text: 'Hi, Oscar! Nice to meet you. We will work with new project together.',
  },
  {
    id: 'm-7',
    conversationId: 'c-oscar',
    senderId: 'olive',
    kind: 'text',
    timeLabel: '12:04 AM',
    text: 'Hi! Please, change the status in this task.',
  },
  {
    id: 'm-8',
    conversationId: 'c-oscar',
    senderId: 'olive',
    kind: 'file',
    timeLabel: '12:04 AM',
    fileName: 'site screens.png',
    fileMeta: '10 MB PNG',
  },
];

export const files: FileItem[] = [
  { id: 'f-1', name: 'site screens.png', meta: '10 MB PNG' },
  { id: 'f-2', name: 'site screens.png', meta: '10 MB PNG' },
];

export const messengerSnapshot: MessengerSnapshot = {
  currentUserId: 'me',
  members,
  groupConversations,
  directConversations,
  messages: chatMessages,
  files,
};

export const mentionCandidates = ['blake', 'carolyn', 'gregory', 'kathryn', 'bernard'];

export const messageActionKeys = ['pin', 'reply', 'share', 'edit', 'delete'] as const;
