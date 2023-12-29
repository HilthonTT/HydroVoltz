"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { createFriendRequest } from "@/actions/create-friend-request";
import { FormSubmit } from "@/components/form/form-submit";
import { FormInput } from "@/components/form/form-input";

export const AddFriendButton = () => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const { execute, FieldErrors } = useAction(createFriendRequest, {
    onSuccess: (data) => {
      toast.success(`Friend request sent to "${data.receiver.username}"`);

      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;

    execute({ username });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="pending" className="h-auto w-auto">
          Add friend
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a friend</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-5">
          <FormInput
            id="username"
            label="Username"
            placeholder="Type someone's username..."
            type="text"
            errors={FieldErrors}
            className="h-12"
          />
          <div className="flex items-center justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
            <FormSubmit>Send</FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
