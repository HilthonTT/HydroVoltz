import { notFound } from "next/navigation";

import { getSelf } from "@/lib/auth-service";
import { getFriendsUser } from "@/lib/friend-service";
import { getUserByUsername } from "@/lib/user-service";

import { Sidebar } from "../_components/sidebar";
import { Container } from "../_components/container";

import { ChatHeader } from "./_components/chat-header";

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

  const friends = await getFriendsUser(self.id);

  return (
    <>
      <Sidebar self={self} friends={friends} />
      <Container>
        <ChatHeader user={otherUser} />
      </Container>
    </>
  );
};

export default UsernamePage;
