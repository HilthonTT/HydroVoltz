import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

const findCall = async (userOneId: string, userTwoId: string) => {
  const call = await db.call.findUnique({
    where: {
      userOneId_userTwoId: {
        userOneId,
        userTwoId,
      },
    },
    include: {
      userOne: true,
      userTwo: true,
    },
  });

  return call;
};

const createCall = async (userOneId: string, userTwoId: string) => {
  const call = await db.call.create({
    data: {
      userOneId,
      userTwoId,
    },
    include: {
      userOne: true,
      userTwo: true,
    },
  });

  return call;
};

export const getOrCreateCall = async (userOneId: string, userTwoId: string) => {
  let call =
    (await findCall(userOneId, userTwoId)) ||
    (await findCall(userTwoId, userOneId));

  if (!call) {
    call = await createCall(userOneId, userTwoId);
  }

  return call;
};

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
    include: {
      userOne: true,
      userTwo: true,
    },
    orderBy: {
      lastCalled: "desc",
    },
  });

  return calls;
};
