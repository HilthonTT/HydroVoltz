import { getBlockedUsers } from "@/lib/block-service";

const BlockedPage = async () => {
  const blockedUsers = await getBlockedUsers();

  return <div></div>;
};

export default BlockedPage;
