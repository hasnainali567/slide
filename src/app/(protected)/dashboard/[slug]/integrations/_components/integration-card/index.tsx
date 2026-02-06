import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM";
};

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
  return (
    <div className='border-2 border-[#ED4C79] rounded-2xl gap-x-5 p-5 flex items-center'>
      {icon}
      <div className='flex flex-col flex-1'>
        <h3 className='text-xl'>{title}</h3>
        <p className='text-base w-full md:w-8/12 xl:w-8/12 2xl:w-6/12 text-[#9d9d9d]'>
          {description}
        </p>
      </div>
      <Button 
    //   onClick={onInstaOAUth()}
    // disabled={integrated?.name === strategy}
    className="gradient-bg text-white rounded-full text-lg font-medium hover:opacity-70 transition duration-100"
       >
        {/* {integrated ? 'Connected' : 'Connect'} */}
        Connect
       </Button>
    </div>
  );
};

export default IntegrationCard;
