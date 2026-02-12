import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = <TData extends { status: number; message?: string } = { status: number; message?: string }, TVariables = unknown,>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey?: string,
  onSuccess?: () => void,
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
      return toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: [queryKey] });
    },
  });
  return { mutate, isPending };
};

export const useMutationDataState = <T = unknown,>(mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as T,
        status: mutation.state.status,
      };
    },
  });

  const latestVariables = data[data.length - 1];
  return { latestVariables };
};
