"use client";

import Image from "next/image";
import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/hint";
import { UploadDropzone } from "@/lib/uploadthing";

interface FilePickerProps {
  onChange: (value: string) => void;
  defaultValue: string;
  isLoading?: boolean;
}

export const FilePicker = ({
  onChange,
  isLoading,
  defaultValue,
}: FilePickerProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState(defaultValue || "");

  const onRemove = () => {
    setThumbnailUrl("");
  };

  const setImage = (value: string) => {
    onChange(value);
    setThumbnailUrl(value);
  };

  const onClose = () => {
    closeRef?.current?.click();

    if (thumbnailUrl) {
      toast.success("Image has been set for your next message", {
        position: "top-center",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Select an image"
          variant="ghost"
          className="h-auto w-auto p-0">
          <ImageIcon className="h-6 w-6" />
          <span className="sr-only">Select an image</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-2">
          <Label>Thumbnail</Label>
          <div className="rounded-xl border outline-dashed outline-muted">
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" side="left" asChild>
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <UploadDropzone
                endpoint="messageFile"
                onClientUploadComplete={(res) => {
                  setImage(res?.[0]?.url);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onClose} disabled={isLoading}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
