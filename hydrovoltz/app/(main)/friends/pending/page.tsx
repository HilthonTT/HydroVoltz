import { getPendingFriendRequests } from "@/lib/friend-service";

import { Container } from "../_components/container";

import { List } from "./_components/list";

const PendingPage = async () => {
  const pending = await getPendingFriendRequests();

  return (
    <Container label="Pending Friend Requests">
      <List data={pending} />
    </Container>
  );
};

export default PendingPage;
