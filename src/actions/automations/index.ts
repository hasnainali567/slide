"use server";

import { currentUser } from "@clerk/nextjs/server";
import {
  addKeyword,
  addListener,
  addTrigger,
  createAutomation,
  findAutomationById,
  getAutomations,
  removeKeyword,
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

export const saveListener = async (
  automationId: string,
  listener: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply?: string,
) => {
  await onCurrentUser();
  try {
    const create = await addListener(automationId, listener, prompt, reply);
    if (create) {
      return { status: 200, data: "Listener created successfully" };
    }
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.log("error from saveListener", error);
    return { status: 500, data: "Internal Server Error" };
  }
};

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser();
  try {
    const create = await addTrigger(automationId, trigger);
    if (create) {
      return { status: 200, data: "Trigger added successfully" };
    }
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.log("error from saveTrigger", error);
    return { status: 500, data: "Internal Server Error" };
  }
};
export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const create = await addKeyword(automationId, keyword);
    if (create) {
      return { status: 200, data: "Keyword added successfully" };
    }
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.log("error from saveKeyword", error);
    return { status: 500, data: "Internal Server Error" };
  }
};
export const deleteKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const deleted = await removeKeyword(automationId, keyword);
    if (deleted) {
      return { status: 200, data: "Keyword deleted successfully" };
    }
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.log("error from deleteKeyword", error);
    return { status: 500, data: "Internal Server Error" };
  }
};



