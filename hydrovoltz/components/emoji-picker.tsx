"use client";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import { Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Pick an emoji"
          variant="ghost"
          className="w-auto h-auto p-0">
          <Smile className="h-6 w-6" />
          <span className="sr-only">Pick an emoji</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none shadow-none drop-shadow-none p-4">
        <div className="flex items-center justify-center">
          <Picker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
