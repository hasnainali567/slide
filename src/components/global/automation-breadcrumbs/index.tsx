"use client";
import { Check, ChevronRight, PencilIcon } from "lucide-react";
import React from "react";
import ActivateAutomationButton from "../activate-automation-button";
import { useQueryAutomation } from "@/hooks/use-query";
import { useEditAutomation } from "@/hooks/use-automation";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
};

const AutomationBreadCrumb = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  const { edit, enableEdit, inputRef, disableEdit, isPending } =
    useEditAutomation(id);

  const { latestVariables } = useMutationDataState(["update-automation"]);
  return (
    <div className='rounded-full w-full p-5 bg-[#18181b1a] flex items-center justify-between'>
      <div className='flex items-center gap-x-3 min-w-0'>
        <p className='text-[#9b9ca0] truncate'>Automations</p>
        <ChevronRight color='#9b9ca0' className='shrink-0' />
        <span className='flex gap-x-3 items-center min-w-0'>
          {edit ? (
            <Input
              disabled={isPending}
              title='Name'
              placeholder={`${isPending ? latestVariables.variables : "Add a new name"}`}
              ref={inputRef}
              defaultValue={data?.data?.name || ""}
              className='bg-transparent h-auto outline-none text-base border-none p-0'
              autoFocus
            />
          ) : (
            <p className='text-[#9b9ca0] truncate'>
              {latestVariables?.variables
                ? latestVariables.variables?.name
                : data?.data?.name}
            </p>
          )}
          {edit ? (
            <span
              onClick={disableEdit}
              className='cursor-pointer hover:opacity-75 duration-100 transition shrink-0 mr-4'
            >
              <Check size={14} />
            </span>
          ) : (
            <span
              onClick={enableEdit}
              className='cursor-pointer hover:opacity-75 duration-100 transition shrink-0 mr-4'
            >
              <PencilIcon size={14} />
            </span>
          )}
        </span>
      </div>
      <div className='flex items-center gap-x-5  ml-auto'>
        <p className='hidden md:block text-sm text-[#9b9ca0] truncate min-w-0'>
          All state are automatically saved
        </p>
        <div className='flex gap-x-5'>
          <p className='text-sm text-[#9b9ca0] truncate min-w-0'>
            Chages saved
          </p>
        </div>
      </div>
      <div>
        <ActivateAutomationButton />
      </div>
    </div>
  );
};

export default AutomationBreadCrumb;
