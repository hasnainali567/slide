"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubsription } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";
import Stripe from "stripe";
import { stripe } from "@/app/(protected)/api/payment/route";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  return user;
};

export const onBoard = async () => {
  const user = await onCurrentUser();
  try {
    const found = await findUser(user.id);
    if (found) {
      if (found.integrations && found.integrations.length > 0) {
        const integration = found.integrations[0];
        if (integration.expiresAt && integration.token) {
          const today = new Date();
          const time_left = integration.expiresAt.getTime() - today.getTime();

          const days_left = Math.ceil(time_left! / (1000 * 3600 * 24));
          if (days_left < 5) {
            console.log("refresh");
            const refresh = await refreshToken(integration.token);

            const today = new Date();
            const expire_date = today.setDate(today.getDate() + 60);
            const update_token = await updateIntegration(
              refresh.access_token,
              new Date(expire_date),
              integration.id,
            );

            if (!update_token) {
              console.log("update token failed");
            }
          }
        }
      }

      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      };
    }

    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses[0].emailAddress,
    );

    return { status: 200, data: created };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const onUserInfo = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    if (profile) {
      return { status: 200, data: profile };
    }

    return { status: 404, error: "User not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const onSubscribe = async (session_id: string) => {
  const user = await onCurrentUser();
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session && session.subscription) {
      const subscribed = await updateSubsription(user.id, {
        customerId: session.customer as string,
        plan: "PRO",
      });
      if (subscribed) {
        return { status: 200, data: "Subscription updated successfully" };
      }
      return { status: 401 };
    }
  } catch (error) {
    console.log("error from onSubscribe", error);
    return { status: 500};
  }
};
