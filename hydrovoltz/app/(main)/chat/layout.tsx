import { redirect } from "next/navigation";

import { getSelf } from "@/lib/auth-service";
import { getFriendsUser } from "@/lib/friend-service";

import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = async ({ children }: ChatLayoutProps) => {
  const self = await getSelf();
  if (!self) {
    return redirect("/login");
  }

  const friends = await getFriendsUser(self.id);

  return (
    <>
      <Sidebar self={self} initialFriends={friends} />
      <Container className="max-h-[calc(95vh-6rem)]">{children}</Container>
    </>
  );
};

export default ChatLayout;
