import { getBlockedUsers } from "@/lib/block-service";

import { Container } from "../_components/container";

import { List } from "./_components/list";

const BlockedPage = async () => {
  const blockedUsers = await getBlockedUsers();

  return (
    <Container label="Blocked users">
      <List data={blockedUsers} />
    </Container>
  );
};

export default BlockedPage;
