"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createAutomation, getAutomations } from "./query";

export const createAutomations = async (id? : string) => {
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
    
    return { status: 500, message: "Internal Server Error from createAutomation" };
  }
};


export const getAllAutomations = async () => {
    const user = await currentUser();
    try {
        if (!user) {
            return { status: 401, data: "Unauthorized" };
        }
        const automations = await getAutomations(user.id)
        if(automations) {
            return { status: 200, data: automations.automations }
        }
        return { status: 404, data: "No automations found" }
    } catch (error) {
        return { status: 500, data: "Internal Server Error" };
    }
}