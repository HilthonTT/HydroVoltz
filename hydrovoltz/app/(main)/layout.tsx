import { getSelf } from "@/lib/auth-service";
import { getPendingFriendRequests } from "@/lib/friend-service";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  const [self, friendRequests] = await Promise.all([
    getSelf(),
    getPendingFriendRequests(),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-20 w-full h-full">
        <Sidebar self={self} friendRequests={friendRequests} />
        <div className="pl-20 h-full w-full">{children}</div>
      </main>
    </>
  );
};

export default ChatLayout;
