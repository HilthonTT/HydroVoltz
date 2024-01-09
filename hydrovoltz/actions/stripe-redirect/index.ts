"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

import { createSafeAction } from "@/lib/create-safe-action";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getSelf } from "@/lib/auth-service";

import { InputType, ReturnType } from "./types";
import { StripeRedirect } from "./schema";

const handler = async (_: InputType): Promise<ReturnType> => {
  const [self, user] = await Promise.all([getSelf(), currentUser()]);

  if (!user || !self) {
    return {
      error: "Unauthorized",
    };
  }

  const settingsUrl = absoluteUrl("/settings");

  let url = "";

  try {
    const subcription = await db.subscription.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (subcription && subcription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subcription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSession.url || "";
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card", "paypal"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user?.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "HydroVoltz Supporter",
                description: "Support HydroVoltz!",
              },
              unit_amount: 100,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: self.id,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath("/settings");
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
