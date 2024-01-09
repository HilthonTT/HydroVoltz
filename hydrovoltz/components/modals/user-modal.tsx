"use client";

import { toast } from "sonner";
import { ThumbsUp, X } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow, isValid, parseISO } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useUserModal } from "@/store/use-user-modal";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateSelf } from "@/actions/update-self";
import { FormSubmit } from "@/components/form/form-submit";

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
  const { user: self } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onClose, user } = useUserModal((state) => state);

  const status =
    (user?.status?.length as number) > 0
      ? user?.status
      : "This user has no status.";

  const isSelf = self?.id === user.externalUserId;

  const onClick = () => {
    if (!isSelf) {
      return;
    }

    setIsEditing(true);
  };

  const { execute, isLoading } = useAction(updateSelf, {
    onSuccess: () => {
      toast.success("Status updated!");
      onClose();
    },
    onError: (error) => {
      toast.error(error);
      onClose();
    },
  });

  const onSubmit = (formData: FormData) => {
    const status = formData.get("status") as string;

    execute({ status });
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
          asChild>
          <a href={`/chat/${user.username}`}>Send Message</a>
        </Button>

        <div className="m-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md">
          <div className="flex flex-col items-start">
            <h1 className="truncate capitalize font-semibold">
              {user?.username}
            </h1>
            {!isEditing && (
              <div className="relative">
                <p
                  onClick={onClick}
                  className={cn(
                    "text-muted-foreground text-sm truncate whitespace-normal",
                    isSelf && "hover:opacity-75 cursor-pointer transition"
                  )}>
                  {status}
                </p>
              </div>
            )}
            {isEditing && (
              <form
                action={onSubmit}
                className="flex items-center justify-center w-full space-x-1">
                <FormInput
                  id="status"
                  className="bg-transparent border-primary my-2 w-full"
                  placeholder={user.status || "Your status"}
                  defaultValue={user.status || ""}
                  fullWidth
                />
                <FormSubmit aria-label="Submit" disabled={isLoading}>
                  <ThumbsUp className="h-4 w-4" />
                </FormSubmit>
                <Button
                  onClick={() => setIsEditing(false)}
                  aria-label="Cancel"
                  type="button"
                  disabled={isLoading}>
                  <X className="h-4 w-4" />
                </Button>
              </form>
            )}
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
