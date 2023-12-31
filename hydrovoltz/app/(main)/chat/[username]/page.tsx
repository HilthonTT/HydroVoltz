import { getSelf } from "@/lib/auth-service";
import { getFriendsUser } from "@/lib/friend-service";

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
  const friends = await getFriendsUser(self.id);

  return (
    <>
      <Sidebar self={self} friends={friends} />
      <Container>
        <div className="flex flex-col h-full">
          <ChatHeader />
        </div>
      </Container>
    </>
  );
};

export default UsernamePage;
