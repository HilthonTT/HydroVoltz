import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

const DATE_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const self = await getSelf();

  if (!self) {
    return false;
  }

  const orgSubscription = await db.subscription.findUnique({
    where: {
      userId: self.id,
    },
    select: {
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription?.stripePriceId &&
    orgSubscription?.stripeCurrentPeriodEnd?.getTime()! + DATE_IN_MS >
      Date.now();

  return !!isValid;
};
