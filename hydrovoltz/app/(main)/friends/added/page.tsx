import { getSelf } from "@/lib/auth-service";
import { getAddedUsers } from "@/lib/friend-service";

import { Container } from "../_components/container";

import { List } from "./_components/list";

const AddedPage = async () => {
  const self = await getSelf();
  const nonAcceptedRequest = await getAddedUsers();

  return (
    <Container label="Added users">
      <List data={nonAcceptedRequest} self={self} />
    </Container>
  );
};

export default AddedPage;
