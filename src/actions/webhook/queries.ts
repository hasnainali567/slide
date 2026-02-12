import { client } from "@/lib/prisma";

export const matchKeyword = async (keyword: string) => {
  return await client.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: "insensitive",
      },
    },
  });
};

export const getKeyWordAutomation = async (id: string, dm: boolean) => {
  return await client.automation.findUnique({
    where: {
      id,
    },
    include: {
      dms: dm,
      trigger: {
        where: {
          type: dm ? "DM" : "COMMENT",
        },
      },
      listener: true,
      User: {
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
          integrations: {
            select: {
              token: true,
            },
          },
        },
      },
    },
  });
};

export const trackResponses = async (
  automationId: string,
  type: "COMMENT" | "DM",
) => {
  if (type === "COMMENT") {
    await client.listener.update({
      where: {
        automationId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }

  if (type === "DM") {
    return await client.listener.update({
      where: {
        automationId,
      },
      data: {
        dmCount: {
          increment: 1,
        },
      },
    });
  }
};

export const createChatHistory = (
  automationId: string,
  sender: string,
  reciever: string,
  message: string,
) => {
  return client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      dms: {
        create: {
          reciever,
          senderId: sender,
          message,
        },
      },
    },
  });
};

export const getChatHistory = async (receiver: string, sender: string) => {
  return await client.dms.findMany({
    where: {
      OR: [
        { senderId: sender, reciever: receiver },
        { senderId: receiver, reciever: sender },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 5
  });
};

export const getKeywordPost = async (automationId: string, postId: string) => {
  return await client.post.findFirst({
    where: {
      AND: [{ postId }, { automationId }],
    },
    select: {
      automationId: true,
    },
  });
};
