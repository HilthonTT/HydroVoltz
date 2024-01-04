"use client";

import { ChatHeaderSkeleton } from "./_components/chat-header";
import { ChatInputSkeleton } from "./_components/chat-input";
import { ChatMessagesSkeleton } from "./_components/chat-messages";

const Loading = () => {
  return (
    <>
      <ChatHeaderSkeleton />
      <ChatMessagesSkeleton />
      <ChatInputSkeleton />
    </>
  );
};

export default Loading;
