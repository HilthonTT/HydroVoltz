import { getFriends } from "@/lib/friend-service";
import { getSelf } from "@/lib/auth-service";

import { List } from "./_components/list";
import { Container } from "./_components/container";

const FriendsPage = async () => {
  const self = await getSelf();
  const friends = await getFriends();

  return (
    <Container label="All friends">
      <List friends={friends} self={self} />
    </Container>
  );
};

export default FriendsPage;
