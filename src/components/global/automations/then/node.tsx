"use client";
import { Separator } from "@/components/ui/separator";
import { useQueryAutomation } from "@/hooks/use-query";
import { BotMessageSquare, CircleAlert, SendHorizonal } from "lucide-react";
import PostButton from "../post";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  const commentTrigger = data?.data?.trigger?.find((t) => t.type === "COMMENT");
  return !data?.data?.listener ? (
    <></>
  ) : (
    <div className='w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#15171D] gap-y-3'>
      <div className='absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50'>
        <Separator
          orientation='vertical'
          className='border-muted border h-10'
        />
      </div>
      <div className='flex gap-x-2 items-center text-[#8C8F94]'>
        <CircleAlert
          fill='#ED4C79'
          stroke='#15171D'
          color='#fff'
          className='text-white'
          size={26}
        />
        Then...
      </div>
      <div className='bg-[#28292E] p-3 rounded-xl flex flex-col gap-y-2'>
        <div className='flex gap-x-2 items-center'>
          {data?.data?.listener?.listener === "MESSAGE" ? (
            <SendHorizonal fill='#ED4C79' stroke='#28292E' size={32} />
          ) : (
            <BotMessageSquare fill='#ED4C79' stroke='#28292E' size={32} />
          )}
          <p className='text-white'>
            {data?.data?.listener?.listener === "MESSAGE"
              ? "Send the user a message"
              : "Let Smart AI take over"}
          </p>
        </div>
        <p className='font-light text-[#9b9ca0]'>
          {data?.data?.listener?.prompt}
        </p>
      </div>
      {data?.data?.posts?.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ThenNode;
