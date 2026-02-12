'use client';
import { onOAuthInstagram } from "@/actions/integrations";
import { onUserInfo } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM";
};

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
  const onInstagramOAuth = () => onOAuthInstagram(strategy);

  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  });

  const integrated = data?.data?.integrations?.find(
    (i: { name: string }) => i.name === strategy,
  );
  return (
    <div className='border-2 border-[#ED4C79] rounded-2xl gap-x-5 p-5 flex items-center'>
      {icon}
      <div className='flex flex-col flex-1'>
        <h3 className='text-xl'>{title}</h3>
        <p className='text-base w-full md:w-8/12 xl:w-8/12 2xl:w-6/12 text-[#9d9d9d] truncate'>
          {description}
        </p>
      </div>
      <Button
        onClick={onInstagramOAuth}
        disabled={integrated?.name === strategy}
        className='gradient-bg text-white rounded-full text-lg font-medium hover:opacity-70 transition duration-100 cursor-pointer'
      >
        {integrated ? 'Connected' : 'Connect'}
      </Button>
    </div>
  );
};

export default IntegrationCard;
