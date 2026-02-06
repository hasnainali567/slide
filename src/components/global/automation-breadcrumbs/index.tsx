import { ChevronRight, PencilIcon } from "lucide-react";
import React from "react";
import ActivateAutomationButton from "../activate-automation-button";

type Props = {
  id: string;
};

const AutomationBreadCrumb = ({ id }: Props) => {
  return (
    <div className='rounded-full w-full p-5 bg-[#18181b1a] flex items-center justify-between'>
      <div className='flex items-center gap-x-3 min-w-0'>
        <p className='text-[#9b9ca0] truncate'>Automations</p>
        <ChevronRight color='#9b9ca0' className="shrink-0" />
        <span className='flex gap-x-3 items-center min-w-0'>
          <p className='text-[#9b9ca0] truncate'>This is the automation title</p>
          <span className='cursor-pointer hover:opacity-75 duration-100 transition shrink-0 mr-4'>
            <PencilIcon size={14} />
          </span>
        </span>
      </div>
      <div className="flex items-center gap-x-5  ml-auto">
        <p className="hidden md:block text-sm text-[#9b9ca0] truncate min-w-0">
            All state are automatically saved
        </p>
        <div className="flex gap-x-5">
            <p className="text-sm text-[#9b9ca0] truncate min-w-0">
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
