import { notFound, redirect } from "next/navigation";

import { isFriendsWithUsername } from "@/lib/friend-service";
import { getOrCreateCall } from "@/lib/call-service";
import { getSelf } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { MediaRoom } from "@/components/media-room";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

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

  await pusherServer.trigger(
    toPusherKey(`user:${otherUser.id}:incoming_calls`),
    "incoming_calls",
    call
  );

  return <MediaRoom callId={call.id} video={true} audio={true} />;
};

export default CallIdPage;
