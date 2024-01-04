"use client";

import qs from "query-string";
import { ElementRef, useRef, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Label } from "@/components/ui/label";

export const Search = () => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams?.get("username") || "");

  const { collapsed } = useChatSidebar((state) => state);

  const onClose = () => {
    closeRef?.current?.click();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          username: value,
        },
      },
      {
        skipEmptyString: true,
      }
    );

    router.push(url);
    onClose();
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <>
      {!collapsed && (
        <form className="relative flex items-center m-2" onSubmit={onSubmit}>
          <Input
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          {value && (
            <X
              className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
              onClick={onClear}
            />
          )}
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="rounded-l-none">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </form>
      )}
      {collapsed && (
        <div className="flex items-center justify-center p-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-auto w-auto p-2" variant="ghost">
                <SearchIcon />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="z-[100]">
              <DialogHeader>
                <DialogTitle>Search for friends</DialogTitle>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="rounded focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <DialogClose ref={closeRef} asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button>Search</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};
