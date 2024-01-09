"use client";

import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUserModal } from "@/store/use-user-modal";

interface ProfileButtonProps {
  self: User;
}

export const ProfileButton = ({ self }: ProfileButtonProps) => {
  const { onOpen } = useUserModal((state) => state);

  const onClick = () => {
    onOpen(self);
  };

  return (
    <Button onClick={onClick}>
      <UserIcon className="h-6 w-6 mr-2" />
      Profile
    </Button>
  );
};
