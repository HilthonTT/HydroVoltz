import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getCalls = async () => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  const calls = await db.call.findMany({
    where: {
      OR: [
        {
          userOneId: self.id,
        },
        {
          userTwoId: self.id,
        },
      ],
    },
    orderBy: {
      lastCalled: "desc",
    },
  });

  return calls;
};
