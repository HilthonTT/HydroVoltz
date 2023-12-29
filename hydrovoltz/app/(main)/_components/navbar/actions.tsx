import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { LogIn, MessageSquareText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { ModeToggle } from "@/components/mode-toggle";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center gap-x-2 ml-4">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="ghost">
            <Hint label="Login">
              <div>
                <LogIn className="h-6 w-6" />
                <span className="sr-only">Login</span>
              </div>
            </Hint>
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center justify-center gap-x-2">
          <Button variant="ghost">
            <Hint label="Talk with friends" asChild>
              <div>
                <MessageSquareText className="h-6 w-6" />
                <span className="sr-only">Talk with friends</span>
              </div>
            </Hint>
          </Button>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
