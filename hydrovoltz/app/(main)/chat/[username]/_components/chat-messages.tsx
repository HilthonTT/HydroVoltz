"use client";

import { DirectMesssage, User } from "@prisma/client";

import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  user: User;
  messages: (DirectMesssage & {
    user: User;
  })[];
}

export const ChatMessages = ({ user, messages }: ChatMessagesProps) => {
  return (
    <div className="overflow-y-auto px-5 h-[85%]">
      {messages?.map((message) => (
        <ChatMessage key={message.id} message={message} user={user} />
      ))}
    </div>
  );
};
