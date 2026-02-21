import { messengerSnapshot } from '../data/messengerDummyData';
import {
  ChatMessage,
  ConversationSummary,
  MessageAction,
  MessengerSnapshot,
} from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchMessengerSnapshot(): Promise<MessengerSnapshot> {
  await sleep(450);

  return {
    ...messengerSnapshot,
    members: [...messengerSnapshot.members],
    groupConversations: [...messengerSnapshot.groupConversations],
    directConversations: [...messengerSnapshot.directConversations],
    messages: [...messengerSnapshot.messages],
    files: [...messengerSnapshot.files],
  };
}

export async function sendMessageDummy(message: ChatMessage): Promise<ChatMessage> {
  await sleep(220);
  return message;
}

export async function editMessageDummy(message: ChatMessage): Promise<ChatMessage> {
  await sleep(180);
  return message;
}

export async function deleteMessageDummy(_messageId: string): Promise<void> {
  await sleep(160);
}

export function buildMessageActions(isOwnMessage: boolean): MessageAction[] {
  return [
    { key: 'pin', label: 'Pin message' },
    { key: 'reply', label: 'Reply' },
    { key: 'share', label: 'Share with...' },
    ...(isOwnMessage ? [{ key: 'edit', label: 'Edit message' } as const] : []),
    ...(isOwnMessage
      ? ([{ key: 'delete', label: 'Delete', destructive: true }] as const)
      : []),
  ];
}

export function updateConversationPreview(
  conversation: ConversationSummary,
  preview: string,
): ConversationSummary {
  return {
    ...conversation,
    lastMessagePreview: preview,
    lastMessageTime: 'Now',
  };
}
