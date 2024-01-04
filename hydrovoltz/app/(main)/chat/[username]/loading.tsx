"use client";

import { Container } from "../_components/container";
import { UserSidebarSkeleton } from "../_components/sidebar";

import { ChatHeaderSkeleton } from "./_components/chat-header";
import { ChatInputSkeleton } from "./_components/chat-input";
import { ChatMessagesSkeleton } from "./_components/chat-messages";

const Loading = () => {
  return (
    <>
      <UserSidebarSkeleton />
      <Container>
        <ChatHeaderSkeleton />
        <ChatMessagesSkeleton />
        <ChatInputSkeleton />
      </Container>
    </>
  );
};

export default Loading;
