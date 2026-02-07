"use client";

import { usePath } from "@/hooks/use-nav";
import { cn, getMonth } from "@/lib/utils";
import Link from "next/link";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";
import { useQueryAutomations } from "@/hooks/use-query";
import CreateAutomationButton from "../create-automation-button";
import CreateAutomation from "../create-aotumation";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useMemo } from "react";

type Props = {};

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomations();
  const { pathname } = usePath();

  const { latestVariables } = useMutationDataState(["create-automation"]);
  const optimisticUiData = useMemo(() => {
    if (!data?.data) return data;

    // Only show optimistic data if mutation is pending (status is 'pending')
    if (latestVariables?.status === "pending" && latestVariables?.variables) {
      const optimisticItem = {
        ...latestVariables.variables,
        // Ensure createdAt is a Date object
        createdAt:
          latestVariables.variables.createdAt instanceof Date
            ? latestVariables.variables.createdAt
            : new Date(latestVariables.variables.createdAt),
        keywords: [], // Default empty array for optimistic UI
        listener: null, // Default values
      };

      // Check if this ID already exists in the real data (to prevent duplicates)
      const existsInRealData = data.data.some(
        (item : {id : string}) => item.id === optimisticItem.id,
      );

      if (!existsInRealData) {
        return { ...data, data: [optimisticItem, ...data.data] };
      }
    }

    return data;
  }, [latestVariables, data]);

  if (data?.status !== 200 || !data?.data || data?.data.length <= 0) {
    return (
      <div
        className='h-[70vh] flex justify-center items-center
     flex-col gap-y-3'
      >
        <h3 className='text-lg text-gray-300'>No Automations</h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-3'>
      {optimisticUiData?.data.map((automation : {id: string, name: string, createdAt: Date, keywords?: string[], listener?: {listener: string}}) => (
        <Link
          key={automation.id}
          href={`${pathname}/${automation.id}`}
          className='bg-[#15171D] hover:opacity-80 transition duration-100 rounded-xl p-5 border radial-gradeint-bg flex border=[#545454'
        >
          <div className='flex flex-col flex-1 items-start'>
            <h2 className='text-xl font-semibold capitalize'>
              {automation.name}
            </h2>
            <p className='text-[#9b9ca0] text-sm font-light mb-2'>
              This is from the comment
            </p>
            {automation.keywords?.length > 0 ? (
              <div className='flex gap-x-2 flex-wrap mt-3'>
                <div
                  className={cn(
                    "rounded-full px-4 py-1 capitalize",
                    (0 + 1) % 1 == 0
                      ? "bg-[#25E486]/15! border-2 border-[#25E486]"
                      : "",
                    (1 + 1) % 2 == 0
                      ? "bg-[#6E1ED2]/15! border-2 border-[#6E1ED2]"
                      : "",
                    (2 + 1) % 3 == 0
                      ? "bg-[#DBC91D]/15! border-2 border-[#DBC91D]"
                      : "",
                    (3 + 1) % 4 == 0
                      ? "bg-[#EE3C19]/15! border-2 border-[#EE3C19]"
                      : "",
                  )}
                >
                  getstarted
                </div>
              </div>
            ) : (
              <div className='rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1'>
                <p className='text-sm text-[#bfc0c3]'>No Keywords</p>
              </div>
            )}
          </div>
          <div className=' flex flex-col justify-between'>
            <p className='capitalize text-sm font-light text-[#9b9ca0]'>
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{" "}
              {automation.createdAt.getUTCDate() === 1
                ? `${automation.createdAt.getUTCDate()}st`
                : `${automation.createdAt.getUTCDate()}th`}{" "}
              , {automation.createdAt.getUTCFullYear()}
            </p>

            {automation.listener?.listener === "SMARTAI" ? (
              <GradientButton
                className='w-full bg-[#202222] text-white hover:bg-[#202222]'
                type='BUTTON'
              >
                Smart AI
              </GradientButton>
            ) : (
              <Button className='w-full bg-[#34bbbb] text-white hover:bg-[#202222]'>
                Standard
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
