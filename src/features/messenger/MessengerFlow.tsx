import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import { mentionCandidates } from './data/messengerDummyData';
import {
  ChatDetailsScreen,
  ConversationScreen,
  MessageActionsSheet,
  MessengerHomeScreen,
} from './screens/MessengerScreens';
import {
  buildMessageActions,
  deleteMessageDummy,
  editMessageDummy,
  fetchMessengerSnapshot,
  sendMessageDummy,
  updateConversationPreview,
} from './services/messengerService';
import {
  ChatDetailsState,
  ChatMessage,
  ConversationSummary,
  MessengerSnapshot,
} from './types';

type MessengerView = 'list' | 'conversation' | 'details';

const initialDetailsState: ChatDetailsState = {
  infoExpanded: false,
  membersExpanded: false,
  mediaExpanded: false,
  filesExpanded: false,
  linksExpanded: false,
};

interface MessengerFlowProps {
  onOpenProfile: () => void;
}

export function MessengerFlow({ onOpenProfile }: MessengerFlowProps) {
  const [snapshot, setSnapshot] = useState<MessengerSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<MessengerView>('list');
  const [activeConversationId, setActiveConversationId] = useState<string>('');
  const [groupConversations, setGroupConversations] = useState<ConversationSummary[]>([]);
  const [directConversations, setDirectConversations] = useState<ConversationSummary[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [listSearchOpen, setListSearchOpen] = useState(false);
  const [listSearchQuery, setListSearchQuery] = useState('');

  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');

  const [draft, setDraft] = useState('');
  const [mentionChip, setMentionChip] = useState<string | null>(null);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  const [actionsMessageId, setActionsMessageId] = useState<string | null>(null);
  const [detailsState, setDetailsState] = useState<ChatDetailsState>(initialDetailsState);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchMessengerSnapshot();
        setSnapshot(response);
        setGroupConversations(response.groupConversations);
        setDirectConversations(response.directConversations);
        setMessages(response.messages);
        setActiveConversationId(response.groupConversations[0]?.id ?? response.directConversations[0]?.id ?? '');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const currentUserId = snapshot?.currentUserId ?? '';
  const members = snapshot?.members ?? [];
  const files = snapshot?.files ?? [];

  const membersById = useMemo(
    () =>
      members.reduce<Record<string, (typeof members)[number]>>((acc, member) => {
        acc[member.id] = member;
        return acc;
      }, {}),
    [members],
  );

  const allConversations = useMemo(
    () => [...groupConversations, ...directConversations],
    [directConversations, groupConversations],
  );

  const activeConversation = useMemo(
    () => allConversations.find((conversation) => conversation.id === activeConversationId) ?? null,
    [activeConversationId, allConversations],
  );

  const activeConversationMessages = useMemo(() => {
    if (!activeConversation) {
      return [] as ChatMessage[];
    }

    return messages.filter((message) => message.conversationId === activeConversation.id);
  }, [activeConversation, messages]);

  const filteredConversationMessages = useMemo(() => {
    const query = chatSearchQuery.trim().toLowerCase();

    if (!query) {
      return activeConversationMessages;
    }

    return activeConversationMessages.filter((message) => {
      const value = [
        message.text ?? '',
        message.fileName ?? '',
        message.fileMeta ?? '',
        message.linkLabel ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return value.includes(query);
    });
  }, [activeConversationMessages, chatSearchQuery]);

  const filteredGroupConversations = useMemo(
    () => filterConversations(groupConversations, listSearchQuery),
    [groupConversations, listSearchQuery],
  );

  const filteredDirectConversations = useMemo(
    () => filterConversations(directConversations, listSearchQuery),
    [directConversations, listSearchQuery],
  );

  const mentionSuggestions = useMemo(() => {
    if (!activeConversation || !snapshot) {
      return [];
    }

    const matchingCandidateIds = mentionCandidates.filter((memberId) =>
      activeConversation.memberIds.includes(memberId),
    );

    const sourceIds =
      matchingCandidateIds.length > 0
        ? matchingCandidateIds
        : activeConversation.memberIds.filter((memberId) => memberId !== snapshot.currentUserId);

    return sourceIds
      .map((memberId) => membersById[memberId])
      .filter(Boolean)
      .map((member) => ({
        id: member.id,
        name: member.name,
        avatarColor: member.avatarColor,
      }));
  }, [activeConversation, membersById, snapshot]);

  const actionMessage =
    actionsMessageId !== null ? messages.find((message) => message.id === actionsMessageId) ?? null : null;

  const messageActions = buildMessageActions(
    Boolean(actionMessage && actionMessage.senderId === currentUserId),
  );

  const showTypingIndicator =
    activeConversation?.type === 'group' &&
    !chatSearchOpen &&
    !editingMessageId &&
    !mentionOpen &&
    view === 'conversation';

  const sharedLinks = activeConversationMessages
    .filter((message) => message.kind === 'link')
    .map((message) => message.linkLabel)
    .filter(Boolean) as string[];

  const conversationMembers =
    activeConversation?.memberIds
      .map((memberId) => membersById[memberId])
      .filter(Boolean)
      .map((member) =>
        member.id === currentUserId
          ? {
              ...member,
              name: `${member.name} (you)`,
            }
          : member,
      ) ?? [];

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading messenger...</Text>;
  }

  if (!snapshot || !activeConversation) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Messenger data is unavailable.</Text>;
  }

  const closeActions = () => {
    setActionsMessageId(null);
  };

  const resetComposer = () => {
    setDraft('');
    setMentionChip(null);
    setMentionOpen(false);
    setEditingMessageId(null);
  };

  const updatePreview = (conversationId: string, preview: string) => {
    setGroupConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? updateConversationPreview(conversation, preview)
          : conversation,
      ),
    );

    setDirectConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? updateConversationPreview(conversation, preview)
          : conversation,
      ),
    );
  };

  const sendMessage = async (message: ChatMessage, preview: string) => {
    const response = await sendMessageDummy(message);
    setMessages((prev) => [...prev, response]);
    updatePreview(message.conversationId, preview);
  };

  const onSendText = () => {
    void (async () => {
      const body = draft.trim();
      const nextText = `${mentionChip ? `@${mentionChip} ` : ''}${body}`.trim();

      if (!nextText || !activeConversation) {
        return;
      }

      if (editingMessageId) {
        const target = messages.find((message) => message.id === editingMessageId);

        if (!target) {
          resetComposer();
          return;
        }

        const updated: ChatMessage = {
          ...target,
          kind: 'text',
          text: nextText,
        };

        await editMessageDummy(updated);
        setMessages((prev) => prev.map((message) => (message.id === updated.id ? updated : message)));
        updatePreview(updated.conversationId, updated.text ?? 'Message updated');
        resetComposer();
        return;
      }

      const payload: ChatMessage = {
        id: `m-${Date.now()}`,
        conversationId: activeConversation.id,
        senderId: currentUserId,
        kind: 'text',
        timeLabel: 'Now',
        text: nextText,
      };

      await sendMessage(payload, nextText);
      resetComposer();
    })();
  };

  const onAttach = () => {
    void (async () => {
      if (!activeConversation) {
        return;
      }

      const file = files[0] ?? { id: 'f-local', name: 'site screens.png', meta: '10 MB PNG' };

      const payload: ChatMessage = {
        id: `m-${Date.now()}`,
        conversationId: activeConversation.id,
        senderId: currentUserId,
        kind: 'file',
        timeLabel: 'Now',
        fileName: file.name,
        fileMeta: file.meta,
      };

      await sendMessage(payload, `Attached file: ${file.name}`);
    })();
  };

  const onShareLink = () => {
    void (async () => {
      if (!activeConversation) {
        return;
      }

      const payload: ChatMessage = {
        id: `m-${Date.now()}`,
        conversationId: activeConversation.id,
        senderId: currentUserId,
        kind: 'link',
        timeLabel: 'Now',
        linkLabel: 'UX Login + Registration',
      };

      await sendMessage(payload, payload.linkLabel ?? 'Shared link');
    })();
  };

  const onMessageAction = (action: (typeof messageActions)[number]['key']) => {
    void (async () => {
      if (!actionMessage) {
        closeActions();
        return;
      }

      if (action === 'pin') {
        Alert.alert('Pinned', 'Message pinned in dummy mode.');
        closeActions();
        return;
      }

      if (action === 'reply') {
        Alert.alert('Reply', 'Reply action is placeholder-only in dummy mode.');
        closeActions();
        return;
      }

      if (action === 'share') {
        Alert.alert('Share', 'Share action is placeholder-only in dummy mode.');
        closeActions();
        return;
      }

      if (action === 'edit') {
        if (actionMessage.kind !== 'text') {
          Alert.alert('Not editable', 'Only text messages can be edited.');
          closeActions();
          return;
        }

        const messageText = actionMessage.text ?? '';
        const mentionedMember = members.find((member) => messageText.startsWith(`@${member.name} `));

        if (mentionedMember) {
          setMentionChip(mentionedMember.name);
          setDraft(messageText.replace(`@${mentionedMember.name} `, ''));
        } else {
          setMentionChip(null);
          setDraft(messageText);
        }

        setEditingMessageId(actionMessage.id);
        closeActions();
        return;
      }

      const nextMessages = messages.filter((message) => message.id !== actionMessage.id);
      await deleteMessageDummy(actionMessage.id);
      setMessages(nextMessages);

      const latest = [...nextMessages]
        .reverse()
        .find((message) => message.conversationId === actionMessage.conversationId);

      updatePreview(actionMessage.conversationId, previewFromMessage(latest));

      if (editingMessageId === actionMessage.id) {
        resetComposer();
      }

      closeActions();
    })();
  };

  const messengerScreen = (() => {
    if (view === 'details') {
      return (
        <ChatDetailsScreen
          conversation={activeConversation}
          members={conversationMembers}
          files={files}
          links={sharedLinks}
          state={detailsState}
          onToggleState={(section) => {
            setDetailsState((prev) => ({ ...prev, [section]: !prev[section] }));
          }}
          onBack={() => setView('conversation')}
          onOpenNotifications={() => {
            Alert.alert('Notifications', 'Notifications panel is handled in My Profile.');
          }}
          onOpenProfile={onOpenProfile}
        />
      );
    }

    if (view === 'conversation') {
      return (
        <ConversationScreen
          conversation={activeConversation}
          membersById={membersById}
          currentUserId={currentUserId}
          messages={filteredConversationMessages}
          chatSearchOpen={chatSearchOpen}
          chatSearchQuery={chatSearchQuery}
          onToggleChatSearch={() => {
            setChatSearchOpen((prev) => !prev);
            setChatSearchQuery('');
          }}
          onChangeChatSearch={setChatSearchQuery}
          onClearChatSearch={() => {
            if (chatSearchQuery.length > 0) {
              setChatSearchQuery('');
              return;
            }

            setChatSearchOpen(false);
          }}
          draft={draft}
          mentionChip={mentionChip}
          mentionOpen={mentionOpen}
          mentionSuggestions={mentionSuggestions}
          showTyping={showTypingIndicator}
          editing={Boolean(editingMessageId)}
          onPickMention={(memberId) => {
            const member = membersById[memberId];
            if (!member) {
              return;
            }

            setMentionChip(member.name);
            setMentionOpen(false);
          }}
          onDraftChange={(value) => {
            setDraft(value);
            if (value.trim().endsWith('@')) {
              setMentionOpen(true);
            }
          }}
          onAttach={onAttach}
          onLink={onShareLink}
          onMention={() => setMentionOpen((prev) => !prev)}
          onEmoji={() => setDraft((prev) => `${prev}${prev ? ' ' : ''}:)`)}
          onSend={onSendText}
          onRemoveMention={() => setMentionChip(null)}
          onCancelEdit={resetComposer}
          onOpenMessageActions={setActionsMessageId}
          onBack={() => {
            setView('list');
            setChatSearchOpen(false);
            setChatSearchQuery('');
            setMentionOpen(false);
            setActionsMessageId(null);
          }}
          onOpenDetails={() => {
            setDetailsState(initialDetailsState);
            setView('details');
          }}
          onOpenNotifications={() => {
            Alert.alert('Notifications', 'Notifications panel is handled in My Profile.');
          }}
          onOpenProfile={onOpenProfile}
        />
      );
    }

    return (
      <MessengerHomeScreen
        groupConversations={filteredGroupConversations}
        directConversations={filteredDirectConversations}
        listSearchOpen={listSearchOpen}
        listSearchQuery={listSearchQuery}
        onChangeListSearch={setListSearchQuery}
        onClearListSearch={() => {
          if (listSearchQuery.length > 0) {
            setListSearchQuery('');
            return;
          }

          setListSearchOpen(false);
        }}
        onToggleListSearch={() => {
          setListSearchOpen((prev) => !prev);
          setListSearchQuery('');
        }}
        onOpenConversation={(conversationId) => {
          setActiveConversationId(conversationId);
          setView('conversation');
          setChatSearchOpen(false);
          setChatSearchQuery('');
          setMentionOpen(false);
          setActionsMessageId(null);
          resetComposer();
        }}
        onOpenNotifications={() => {
          Alert.alert('Notifications', 'Notifications panel is handled in My Profile.');
        }}
        onOpenProfile={onOpenProfile}
        onStartConversation={() => {
          Alert.alert('New conversation', 'Creating conversations is placeholder-only in dummy mode.');
        }}
      />
    );
  })();

  return (
    <>
      {messengerScreen}
      <MessageActionsSheet
        visible={Boolean(actionsMessageId)}
        title="Select action with the message"
        actions={messageActions}
        onClose={closeActions}
        onPressAction={onMessageAction}
      />
    </>
  );
}

function previewFromMessage(message: ChatMessage | undefined): string {
  if (!message) {
    return 'No messages yet.';
  }

  if (message.kind === 'text') {
    return message.text ?? 'Text message';
  }

  if (message.kind === 'file') {
    return `Attached file: ${message.fileName ?? 'File'}`;
  }

  return message.linkLabel ?? 'Shared link';
}

function filterConversations(
  conversations: ConversationSummary[],
  query: string,
): ConversationSummary[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return conversations;
  }

  return conversations.filter((conversation) => {
    const searchable = `${conversation.title} ${conversation.lastMessagePreview}`.toLowerCase();
    return searchable.includes(normalized);
  });
}
