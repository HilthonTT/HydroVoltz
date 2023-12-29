import { getSelf } from "@/lib/auth-service";

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

  return (
    <>
      <Sidebar self={self} />
      <Container>
        <div className="flex flex-col h-full">
          <ChatHeader />
        </div>
      </Container>
    </>
  );
};

export default UsernamePage;
