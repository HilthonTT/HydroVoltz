import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    return redirect("/sign-in");
  }

  return user;
};

export const getSelfPages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: userId,
    },
  });

  return user;
};
