"use client";

import { ElementRef, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddFriendButton = () => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const onSubmit = () => {};

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
        <form className="space-y-5">
          <Label>Username</Label>
          <Input placeholder="Type someone's username..." />
          <div className="flex items-center justify-between">
            <DialogClose ref={closeRef}>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
