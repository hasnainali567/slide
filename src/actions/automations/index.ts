"use server";

import { currentUser } from "@clerk/nextjs/server";
import {
  createAutomation,
  findAutomationById,
  getAutomations,
  updateAutomation,
} from "./query";
import { onCurrentUser } from "../user";

export const createAutomations = async (id?: string) => {
  const user = await currentUser();
  try {
    if (!user) {
      return { status: 401, message: "Unauthorized" };
    }
    const create = await createAutomation(user.id, id);
    if (create) {
      return { status: 200, message: "Automation created" };
    }
    return { status: 500, message: "Failed to create automation" };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      message: "Internal Server Error from createAutomation",
    };
  }
};

export const getAllAutomations = async () => {
  const user = await currentUser();
  try {
    if (!user) {
      return { status: 401, data: "Unauthorized" };
    }
    const automations = await getAutomations(user.id);
    if (automations) {
      return { status: 200, data: automations.automations };
    }
    return { status: 404, data: "No automations found" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "Internal Server Error" };
  }
};

export const getAutomationInfo = async (id: string) => {
  await onCurrentUser();
  try {
    const automation = await findAutomationById(id);
    if (automation) {
      return { status: 200, data: automation };
    }
    return { status: 404 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const updateAutomationName = async (
  automationId: string,
  data: { name?: string; active?: boolean; automation?: string },
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) {
      return { status: 200, data: "Automation updated successfully" };
    }
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.log("error from updateAutomationName", error);
    return { status: 500, data: "Internal Server Error" };
  }
};
