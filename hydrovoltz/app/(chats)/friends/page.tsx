import { redirectToSignIn } from "@clerk/nextjs";
import { User } from "@prisma/client";

import { getSelf } from "@/lib/auth-service";
import { getFriends } from "@/lib/friend-service";

import { Header } from "./_components/header";
import { List } from "./_components/list";

interface FriendsPageProps {
  searchParams: {
    type: string | null;
  };
}

const FriendsPage = async ({ searchParams }: FriendsPageProps) => {
  const self = await getSelf();

  if (!self) {
    return redirectToSignIn();
  }

  let users: User[] = [];

  switch (searchParams?.type) {
    case "pending":
      break;
    case "blocked":
      break;
    default:
      users = await getFriends();
      break;
  }

  return (
    <div className="w-full h-full p-8 space-y-4">
      <Header />
      <List users={users} />
    </div>
  );
};

export default FriendsPage;
