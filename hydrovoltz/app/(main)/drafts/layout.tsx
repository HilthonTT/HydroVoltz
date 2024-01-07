import { getSelf } from "@/lib/auth-service";

import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";
import { getUserConversations } from "@/lib/conversation-service";

interface DraftLayoutProps {
  children: React.ReactNode;
}

const DraftLayout = async ({ children }: DraftLayoutProps) => {
  const [self, conversations] = await Promise.all([
    getSelf(),
    getUserConversations(),
  ]);

  return (
    <>
      <Sidebar self={self} conversations={conversations} />
      <Container>{children}</Container>
    </>
  );
};

export default DraftLayout;
