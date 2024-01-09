import { checkSubscription } from "@/lib/subscription";
import { getSelf } from "@/lib/auth-service";

import { SubscriptionButton } from "./_components/subscription-button";
import { ProfileButton } from "./_components/profile-button";

const SettingsPage = async () => {
  const [self, isSubscribed] = await Promise.all([
    getSelf(),
    checkSubscription(),
  ]);

  return (
    <div className="w-full h-full p-8">
      <div className="bg-secondary rounded-lg p-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="mt-2 flex flex-col items-start justify-center space-y-4">
          <SubscriptionButton isSubscribed={isSubscribed} />
          <ProfileButton self={self} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
