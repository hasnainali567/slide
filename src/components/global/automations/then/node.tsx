"use client";
import { Separator } from "@/components/ui/separator";
import { useQueryAutomation } from "@/hooks/use-query";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  const commentTrigger = data?.data?.trigger?.find((t) => t.type === "COMMENT");
  return !data?.data?.listener ? (
    <></>
  ) : (
    <div className='w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3'>
        <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-[#282a2d] rounded-full">
            <Separator 
            orientation="vertical" 
            className="bottom-full flex-1 border border-[#282a2d]"/>
        </span>
        </div>

    </div>
  );
};

export default ThenNode;
