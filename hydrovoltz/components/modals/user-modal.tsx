"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow, isValid, parseISO } from "date-fns";
import { User } from "@prisma/client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useUserModal } from "@/store/use-user-modal";

function determineDate(user: Partial<User>) {
  const createdAt = user?.createdAt;

  if (!createdAt) {
    return "";
  }

  let createdAtDate;

  if (createdAt instanceof Date) {
    createdAtDate = createdAt;
  } else {
    createdAtDate = parseISO(createdAt);
  }

  if (isValid(createdAtDate)) {
    const formattedDistance = formatDistanceToNow(createdAtDate, {
      addSuffix: true,
    });

    return formattedDistance;
  }
}

export const UserModal = () => {
  const router = useRouter();
  const { isOpen, onClose, user } = useUserModal((state) => state);

  const status =
    (user?.status?.length as number) > 0
      ? user?.status
      : "This user has no status.";

  const onClick = () => {
    if (!user || !user?.username) {
      return;
    }

    router.push(`/chat/${user?.username?.toLocaleLowerCase()}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <div className="bg-secondary h-20 w-full top-0" />
        <UserAvatar
          username={user?.username || ""}
          imageUrl={user?.imageUrl || ""}
          size="lg"
          className="absolute top-10 left-4"
        />

        <Button
          variant="pending"
          className="h-auto w-auto top-14 right-2 absolute"
          onClick={onClick}>
          Send Message
        </Button>

        <div className="m-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md">
          <div className="flex flex-col items-start">
            <h1 className="truncate capitalize font-semibold">
              {user?.username}
            </h1>
            <p className="text-muted-foreground text-sm">{status}</p>
          </div>
          <p className="mt-4 text-xs font-semibold">User info</p>
          <Separator className="my-4 bg-zinc-600" />
          <ul className="list-disc mx-4 text-sm">
            <li>Joined {determineDate(user)}</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
