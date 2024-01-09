import { checkSubscription } from "@/lib/subscription";

import { SubscriptionButton } from "./_components/subscription-button";

const SettingsPage = async () => {
  const isSubscribed = await checkSubscription();

  return (
    <div className="w-full h-full p-8">
      <div className="bg-secondary rounded-lg p-8 h-[150px]">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="mt-2">
          <SubscriptionButton isSubscribed={isSubscribed} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
