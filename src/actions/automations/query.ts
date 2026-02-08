"use server";

import { client } from "@/lib/prisma";
import { v4 } from "uuid";

export const createAutomation = async (clerkId: string, id?: string) => {
  return await client.user.update({
    where: { clerkId },
    data: {
      automations: {
        create: {
          ...(id && { id }),
        },
      },
    },
  });
};

export const getAutomations = async (clerkId: string) => {
  return await client.user.findUnique({
    where: { clerkId },
    select: {
      automations: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
};

export const findAutomationById = async (id: string) => {
  return await client.automation.findUnique({
    where: { id },
    include: {
      keywords: true,
      listener: true,
      posts: true,
      trigger: true,
      User: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  });
};

export const updateAutomation = async (
  id: string,
  data: {
    name?: string;
    active?: boolean;
  },
) => {
  return await client.automation.update({
    where: { id },
    data: {
      name: data.name,
      active: data.active,
    },
  });
};
