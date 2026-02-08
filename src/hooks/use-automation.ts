import { useMutationData } from "./use-mutation-data"
import { createAutomations } from "@/actions/automations"

export const useCreateAutomation = () => {
    const {mutate, isPending} = useMutationData(
        ["create-automation"],
        (data: { id: string, }) => createAutomations(data.id),
        'user-automations'
    )

    return {
        isPending,
        mutate
    }
}