"use client";

import { ArrowLeftFromLine, ArrowRightFromLine, PenSquare } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useDraftSidebar } from "@/store/use-draft-sidebar";

export const Toggle = () => {
  const { onCollapse, onExpand, collapsed } = useDraftSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary text-xl">Drafts</p>
          <Hint label="New Chat" side="top" asChild>
            <Button variant="ghost" className="w-auto h-auto p-2 ml-2">
              <PenSquare className="h-4 w-4" />
            </Button>
          </Hint>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="h-auto p-2 ml-auto">
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};
