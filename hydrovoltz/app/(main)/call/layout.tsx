import { getFriendsUser } from "@/lib/friend-service";
import { getCalls } from "@/lib/call-service";

import { CallSidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CallLayoutProps {
  children: React.ReactNode;
}

const CallLayout = async ({ children }: CallLayoutProps) => {
  const [calls, friends] = await Promise.all([getCalls(), getFriendsUser()]);

  return (
    <>
      <CallSidebar calls={calls} friends={friends} />
      <Container>{children}</Container>
    </>
  );
};

export default CallLayout;
