"use client";

import { User } from "@prisma/client";
import { toast } from "sonner";
import { Copy, MoreVertical, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserModal } from "@/store/use-user-modal";
import { Hint } from "@/components/hint";

interface UserCardOptionsProps {
  user: User;
}

export const UserCardOptions = ({ user }: UserCardOptionsProps) => {
  const { onOpen } = useUserModal((state) => state);

  const handleOpen = () => {
    onOpen(user);
  };

  const onUsernameCopy = () => {
    navigator.clipboard.writeText(user?.username);

    toast.success("Copied username!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={(e) => e.stopPropagation()}>
          <Hint label="Options" asChild>
            <div>
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </div>
          </Hint>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={onUsernameCopy} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          <span>Copy Username</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpen} className="cursor-pointer">
          <UserIcon className="h-4 w-4 mr-2" />
          <span>View Profile</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
