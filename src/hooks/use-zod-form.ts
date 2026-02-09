import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = (schema : z.ZodObject<any>, mutation : UseMutateFunction, defaultValues? : any) => {
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<z.infer<typeof schema>>({
        resolver : zodResolver(schema),
        defaultValues :{
            ...defaultValues
        }
    })

    const onFormSubmit = handleSubmit(async (data : typeof defaultValues) => mutation({...data}));

    return {
        register,
        onFormSubmit,
        errors,
        watch,
        reset
        
    }
}