import React from "react";
import PopOver from "../../popover";
import { CirclePlus, Plus } from "lucide-react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const TriggerButton = ({ label, children }: Props) => {
  return (
    <PopOver
      className='w-[400px]'
      trigger={
        <div className='border-2 border-dashed border-[#EC498C] text-white w-full hover:opacity-80 cursor-pointer transition duration-100 rounded-xl flex gap-x-2 justify-center items-center p-5'>
          <CirclePlus fill='#EC498C' className='text-white border-[#EC498C]' />
          <p className='font-bold text-[#EC498C]'>{label}</p>
        </div>
      }
    >
      {children}
    </PopOver>
  );
};

export default TriggerButton;
