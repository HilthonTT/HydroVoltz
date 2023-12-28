import Link from "next/link";
import { SignInButton, currentUser } from "@clerk/nextjs";
import {
  File,
  LogIn,
  MessageSquareText,
  PhoneCall,
  Trophy,
} from "lucide-react";

import { Logo } from "@/components/logo";

import { FeatureCard } from "./_components/feature-card";
import { Button } from "@/components/ui/button";

const MarketingPage = async () => {
  const user = await currentUser();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 space-y-4">
      <Logo />
      <div className="text-xl">
        <p className="font-semibold">
          By using our service, you certify to having these features!
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <FeatureCard
            icon={PhoneCall}
            label="Unlimited amount of phone calls!"
          />
          <FeatureCard
            icon={MessageSquareText}
            label="Chat with your friends!"
          />
          <FeatureCard icon={File} label="Transfer files to your collegues!" />
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 dark:text-neutral-300  mt-4 max-w-md text-center mx-auto">
        Manage friendships, make new friendships. Socialize with users or
        communicate plans with collegues and family members!
      </div>
      {!user && (
        <SignInButton>
          <Button size="lg" className="mt-2">
            <LogIn className="mr-2" />
            Login to try out HydroVoltz!
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <Button size="lg" className="mt-2" asChild>
          <Link href="/chat">
            <Trophy className="mr-2" />
            Try out now!
          </Link>
        </Button>
      )}
    </div>
  );
};

export default MarketingPage;
