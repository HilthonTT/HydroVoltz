import { getFriendsUser } from "@/lib/friend-service";
import { getCalls } from "@/lib/call-service";
import { getSelf } from "@/lib/auth-service";

import { CallSidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CallLayoutProps {
  children: React.ReactNode;
}

const CallLayout = async ({ children }: CallLayoutProps) => {
  const [calls, friends, self] = await Promise.all([
    getCalls(),
    getFriendsUser(),
    getSelf(),
  ]);

  return (
    <>
      <CallSidebar calls={calls} friends={friends} self={self} />
      <Container>{children}</Container>
    </>
  );
};

export default CallLayout;
