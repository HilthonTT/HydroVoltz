import { getFriends } from "@/lib/friend-service";
import { getSelf } from "@/lib/auth-service";

import { List } from "./_components/list";
import { Container } from "./_components/container";

const FriendsPage = async () => {
  const [self, friends] = await Promise.all([getSelf(), getFriends()]);

  return (
    <Container label="All friends">
      <List initialFriends={friends} self={self} />
    </Container>
  );
};

export default FriendsPage;
