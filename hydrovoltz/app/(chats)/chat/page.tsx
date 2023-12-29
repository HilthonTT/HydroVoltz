import { redirectToSignIn } from "@clerk/nextjs";

import { getSelf } from "@/lib/auth-service";

import { Sidebar } from "./_components/sidebar/index";
import { Container } from "./_components/container";

const ChatPage = async () => {
  const self = await getSelf();

  if (!self) {
    return redirectToSignIn();
  }

  return (
    <>
      <Sidebar self={self} />
      <Container>Chat Page</Container>
    </>
  );
};

export default ChatPage;
