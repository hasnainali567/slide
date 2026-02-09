"use client";
import { useQueryAutomation } from "@/hooks/use-query";
import ActiveTrigger from "./active-trigger";
import { Separator } from "@/components/ui/separator";
import ThenAction from "../then/then-action";
import TriggerButton from "../trigger-button";
import { AUTOMATION_TRIGGERS } from "@/constant/automations";
import { useTrigger } from "@/hooks/use-automation";
import { cn } from "@/lib/utils";
import Keywords from "./keywords";
import { Button } from "@/components/ui/button";
import Loader  from "@/components/global/loader";

type Props = {
  id: string;
};

const Trigger = ({ id }: Props) => {
  const { onSetTrigger, onSaveTrigger, isPending, types } = useTrigger(id);
  const { data } = useQueryAutomation(id);

  if (data?.data && data?.data?.trigger?.length > 0) {
    return (
      <div className='flex flex-col gap-y-6 items-center '>
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data?.data?.keywords}
        />
        {/* wip:  */}
        {data.data?.trigger?.length > 1 && (
          <>
            <div className='relative w-6/12 mt-4'>
              <p className='absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'>
                or
              </p>
              <Separator
                orientation='horizontal'
                className='border-muted border'
              />
            </div>
            <ActiveTrigger
              type={data.data.trigger[0].type}
              keywords={data?.data?.keywords}
            />
          </>
        )}

        {!data.data.listener && <ThenAction id={id} />}
      </div>
    );
  }
  return (
    <TriggerButton label='Add Trigger'>
      <div className='flex flex-col gap-y-2'>
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div
            className={cn(
              "hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col gap-y-2 p-3",
              !types?.find((t) => t === trigger.type)
                ? "bg-[#28292e]"
                : "gradient-bg",
            )}
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
          >
            <div className='flex gap-x-2 items-center'>
              {trigger.icon}
              <p>{trigger.lable}</p>
            </div>
            <p className='text-[#9b9ca0] text-sm'>{trigger.description}</p>
          </div>
        ))}
        <Keywords id={id} />
        <Button
          onClick={onSaveTrigger}
          disabled={!types || types.length === 0 || isPending}
        className="gradient-bg font-medium text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  );
};

export default Trigger;
