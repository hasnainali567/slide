import { getAutomationInfo } from "@/actions/automations";
import AutomationBreadCrumb from "@/components/global/automation-breadcrumbs";
import PostNode from "@/components/global/automations/post/node";
import ThenNode from "@/components/global/automations/then/node";
import Trigger from "@/components/global/automations/trigger";
import { PrefetchUserAutomation } from "@/react-query/prefetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AlertCircle, CircleAlert } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

//meta daata

export const generateMetadata = async ({
  params,
}: Props) => {
  const { id } = await params;
  const info = await getAutomationInfo(id);
  return {
    title: info?.data?.name || "Automation",
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const query = new QueryClient();
  await PrefetchUserAutomation(query, id);
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='flex flex-col items-center gap-y-20'>
        <AutomationBreadCrumb id={id} />
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#15171D] gap-y-3'>
          <div className='flex gap-x-2 items-center text-[#8C8F94]'>
            <CircleAlert fill="#ED4C79"  stroke="#15171D" color="#fff" className="text-white" size={26} />
            When...
          </div>
          <Trigger id={id} />
        </div>
          <ThenNode id={id} />
          <PostNode id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
