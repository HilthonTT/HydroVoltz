"use client";

import { ElementRef, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { deleteDirectMessage } from "@/actions/delete-direct-message";
import { useAction } from "@/hooks/use-action";
import { useModal } from "@/store/use-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

export const DeleteDirectMessageModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { isOpen, onClose, type, data } = useModal((state) => state);
  const { directMessage } = data;
  const isModalOpen = isOpen && type === "deleteDirectMessage";

  const { execute } = useAction(deleteDirectMessage, {
    onSuccess: () => {
      toast.success("Message has been deleted");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({
      id: directMessage?.id as string,
      conversationId: directMessage?.conversationId as string,
    });

    closeRef?.current?.click();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete message</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this message?
        </DialogDescription>

        <div className="group flex items-center gap-x-3 py-4 w-full justify-end">
          <div className="flex flex-col justify-center items-end">
            <span className="text-sm font-semibold capitalize px-1">
              {directMessage?.user.username}
            </span>
            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
              <p className="truncate">{directMessage?.content}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(directMessage?.createdAt || 0), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <UserAvatar
            username={directMessage?.user?.username || ""}
            imageUrl={directMessage?.user?.imageUrl || ""}
            size="lg"
          />
        </div>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
          <Button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-400 text-white">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
