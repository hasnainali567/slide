import { UseMutateFunction } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = <TSchema extends z.ZodObject<z.ZodRawShape>>(
  schema : TSchema,
  mutation : UseMutateFunction<unknown, Error, z.infer<TSchema>, unknown>,
  defaultValues?: z.infer<TSchema>
) => {
    type FormData = z.infer<TSchema>;
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<FormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver : zodResolver(schema) as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValues : defaultValues as any,
    })

    const onFormSubmit: SubmitHandler<FormData> = (data) => {
        mutation(data);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = handleSubmit(onFormSubmit as any);

    return {
        register,
        onFormSubmit: handleFormSubmit,
        errors,
        watch,
        reset
        
    }
}