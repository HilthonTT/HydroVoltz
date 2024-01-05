import { getPendingFriendRequests } from "@/lib/friend-service";
import { getSelf } from "@/lib/auth-service";

import { Container } from "../_components/container";

import { List } from "./_components/list";

const PendingPage = async () => {
  const [self, friendRequests] = await Promise.all([
    getSelf(),
    getPendingFriendRequests(),
  ]);

  return (
    <Container label="Pending Friend Requests">
      <List initialRequests={friendRequests} self={self} />
    </Container>
  );
};

export default PendingPage;
