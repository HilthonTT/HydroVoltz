"use client";

import qs from "query-string";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Phone, PhoneCall, Video } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FriendCard } from "./friend-card";

interface FriendDropdownProps {
  friends: User[];
}

export const FriendDropdown = ({ friends }: FriendDropdownProps) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);

  const toggleFriendSelection = (friend: User) => {
    if (selectedFriend) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend);
    }
  };

  const onVoiceCall = () => {
    if (!selectedFriend) {
      return;
    }

    const url = qs.stringifyUrl({
      url: `/call/${selectedFriend.id}`,
      query: { voice: true },
    });

    router.push(url);
  };

  const onVideoCall = () => {
    if (!selectedFriend) {
      return;
    }

    const url = qs.stringifyUrl({
      url: `/call/${selectedFriend.id}`,
      query: { video: true },
    });

    router.push(url);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 h-auto w-auto ml-2">
          <Hint label="Make a new call" side="top" asChild>
            <PhoneCall className="h-4 w-4" />
          </Hint>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 ml-20 p-2">
        <div className="p-2 space-y-3">
          <h2 className="text-lg font-semibold">New call</h2>
          <p className="text-sm text-muted-foreground">All contacts</p>
        </div>
        <div>
          {!!selectedFriend && (
            <div className="flex items-center justify-between">
              <Hint label="Video Call" asChild>
                <Button variant="outline" onClick={onVideoCall}>
                  <Video className="h-5 w-5" />
                </Button>
              </Hint>
              <Hint label="Voice Call" asChild>
                <Button variant="outline" onClick={onVoiceCall}>
                  <Phone className="h-5 w-5" />
                </Button>
              </Hint>
              <Button className="p-2 h-auto w-auto">Cancel</Button>
            </div>
          )}
        </div>
        <ScrollArea className="w-full h-[350px] space-y-2">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              toggleFriendSelection={toggleFriendSelection}
              isSelected={selectedFriend?.id === friend.id}
            />
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
