import { notFound, redirect } from "next/navigation";

import { isFriendsWithUsername } from "@/lib/friend-service";
import { getOrCreateCall } from "@/lib/call-service";
import { getSelf } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { MediaRoom } from "@/components/media-room";

interface CallIdPageProps {
  params: {
    username: string;
  };
}

const CallIdPage = async ({ params }: CallIdPageProps) => {
  const [self, isFriends] = await Promise.all([
    getSelf(),
    isFriendsWithUsername(params.username),
  ]);

  if (!isFriends) {
    return notFound();
  }

  const otherUser = await getUserByUsername(params.username);
  if (!otherUser) {
    return notFound();
  }

  const call = await getOrCreateCall(self.id, otherUser.id);
  if (!call) {
    return redirect("/call");
  }

  return <MediaRoom callId={call.id} video={true} audio={true} />;
};

export default CallIdPage;
