import { useEffect, useState } from "react";
import { User } from "@prisma/client";

import { ConversationWithUsers } from "@/types";
import { getConversationDraftKey } from "@/lib/utils";

type Draft = {
  draft: string;
  conversation: ConversationWithUsers;
};

export const useDrafts = (
  conversations: ConversationWithUsers[],
  self: User,
  username?: string | null
) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const draftsList = conversations.reduce<Draft[]>((acc, conversation) => {
      const draftKey = getConversationDraftKey(conversation.id);
      const savedDraft = localStorage.getItem(draftKey);

      const otherUser =
        conversation.userOneId === self.id
          ? conversation.userTwo
          : conversation.userOne;

      if (username && !otherUser.username.includes(username)) {
        return acc; // Skip this draft if username is provided and doesn't match
      }

      if (savedDraft) {
        acc.push({
          draft: savedDraft,
          conversation: conversation,
        });
      }
      return acc;
    }, []);

    setDrafts(draftsList);
  }, [conversations, self.id, username]);

  return drafts;
};
