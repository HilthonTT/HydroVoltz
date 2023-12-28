import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";

const ChatPage = () => {
  return (
    <div className="p-8 flex flex-col space-y-4 w-full h-full">
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default ChatPage;
