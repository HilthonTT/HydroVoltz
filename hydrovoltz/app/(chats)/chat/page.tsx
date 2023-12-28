import { redirectToSignIn } from "@clerk/nextjs";

import { getSelf } from "@/lib/auth-service";

import { UserSidebar } from "./_components/user-sidebar";

const ChatPage = async () => {
  const self = await getSelf();

  if (!self) {
    return redirectToSignIn();
  }

  return (
    <>
      <UserSidebar self={self} />
      <div className="pl-80">Chat Page</div>
    </>
  );
};

export default ChatPage;
