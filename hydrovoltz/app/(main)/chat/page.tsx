import { Lock } from "lucide-react";
import { redirectToSignIn } from "@clerk/nextjs";

import { getSelf } from "@/lib/auth-service";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

import { Sidebar } from "./_components/sidebar/index";
import { Container } from "./_components/container";

export function generateMetadata() {
  return {
    title: "Chats",
  };
}

const ChatPage = async () => {
  const self = await getSelf();

  if (!self) {
    return redirectToSignIn();
  }

  return (
    <>
      <Sidebar self={self} />
      <Container>
        <div className="flex flex-col items-center justify-center h-full my-auto w-full">
          <Logo showSlogan={false} />
          <div className="max-w-2xl text-center">
            <p className="font-semibold text-muted-foreground text-xs lg:text-base">
              Send and receive messages. Communicate your thoughts.{" "}
            </p>
          </div>
          <div className="bottom-12 fixed">
            <Badge className="p-2">
              <Lock className="h-4 w-4 mr-2" />
              End-to-end encrypted
            </Badge>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ChatPage;
