import { notFound, redirect } from "next/navigation";

import { getSelf } from "@/lib/auth-service";
import { getFriendsUser } from "@/lib/friend-service";
import { getUserByUsername } from "@/lib/user-service";
import { getOrCreateConversation } from "@/lib/conversation-service";
import { getDirectMessages } from "@/lib/direct-message-service";

import { Sidebar } from "../_components/sidebar";
import { Container } from "../_components/container";

import { ChatHeader } from "./_components/chat-header";
import { ChatInput } from "./_components/chat-input";
import { ChatMessages } from "./_components/chat-messages";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const self = await getSelf();
  const otherUser = await getUserByUsername(params.username, self);

  if (!otherUser) {
    return notFound();
  }

  const conversation = await getOrCreateConversation(self.id, otherUser.id);

  if (!conversation) {
    return redirect("/chat");
  }

  const friends = await getFriendsUser(self.id);
  const messages = await getDirectMessages(conversation.id);

  return (
    <>
      <Sidebar self={self} friends={friends} />
      <Container className="max-h-[calc(95vh-6rem)]">
        <ChatHeader user={otherUser} />
        <ChatMessages
          user={self}
          initialMessages={messages}
          conversationId={conversation.id}
        />
        <ChatInput user={otherUser} conversationId={conversation.id} />
      </Container>
    </>
  );
};

export default UsernamePage;
