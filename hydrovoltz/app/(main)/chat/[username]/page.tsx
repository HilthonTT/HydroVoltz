import { notFound, redirect } from "next/navigation";

import { getSelf } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { getOrCreateConversation } from "@/lib/conversation-service";
import { getDirectMessages } from "@/lib/direct-message-service";
import { isFriendsWithUsername } from "@/lib/friend-service";

import { ChatHeader } from "./_components/chat-header";
import { ChatInput } from "./_components/chat-input";
import { ChatMessages } from "./_components/chat-messages";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const [self, isFriends] = await Promise.all([
    getSelf(),
    isFriendsWithUsername(params.username),
  ]);

  if (!isFriends) {
    return notFound();
  }

  const otherUser = await getUserByUsername(params.username, self);
  if (!otherUser) {
    return notFound();
  }

  const conversation = await getOrCreateConversation(self.id, otherUser.id);

  if (!conversation) {
    return redirect("/chat");
  }
  const messages = await getDirectMessages(conversation.id);

  return (
    <>
      <ChatHeader user={otherUser} />
      <ChatMessages
        user={self}
        initialMessages={messages}
        conversationId={conversation.id}
      />
      <ChatInput user={otherUser} conversationId={conversation.id} />
    </>
  );
};

export default UsernamePage;
