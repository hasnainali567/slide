'use server'

import { createAutomation } from "./query";

export const getAllAutomations = async () => {
    const user = await currentUser();
    try {
        const create = await createAutomation(user.id)
        if(create) {
            return {status : 201, data : 'Automation created'}

        }
        return {status : 500, data : 'Failed to create automation'}
    } catch (error) {
        return {status : 500, data : 'Internal Server Error'}
    }
}