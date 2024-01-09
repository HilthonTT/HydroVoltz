import { getStarredDirectMessages } from "@/lib/direct-message-service";
import { getSelf } from "@/lib/auth-service";

import { Header } from "./_components/header";
import { Message } from "./_components/message";

const StarredMessagesPage = async () => {
  const [self, starredMessages] = await Promise.all([
    getSelf(),
    getStarredDirectMessages(),
  ]);

  return (
    <div className="p-8">
      <Header label="Starred Messages" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {starredMessages.map((message) => (
          <Message key={message.id} message={message} self={self} />
        ))}
      </div>
    </div>
  );
};

export default StarredMessagesPage;
