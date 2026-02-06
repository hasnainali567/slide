import AutomationBreadCrumb from "@/components/global/automation-breadcrumbs";
import Trigger  from "@/components/global/automations/trigger";
import { AlertCircle } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

//meta daata

const Page =  async ({ params }: Props) => {
    const { id } = await params;
  return (
    <div className='flex flex-col items-center gap-y-20'>
      <AutomationBreadCrumb id={id} />
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#15171D] gap-y-3">
      <div className="flex gap-x-2">
        <AlertCircle />
        When...
      </div>
      <Trigger id={id} />
      </div>
    </div>
  );
};

export default Page;
