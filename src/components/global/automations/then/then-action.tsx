import { useListener } from "@/hooks/use-automation";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constant/automations";
import Subscription from "../../subscription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListener(id);

  return (
    <TriggerButton label='Then'>
      <div className='flex flex-col gap-y-2'>
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <Subscription key={listener.id} type='PRO'>
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type ? "gradient-bg" : "bg-[#15171D]",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
                )}
              >
                <div className='flex gap-x-2 items-center'>
                  {listener.icon}
                  <p>{listener.lable}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </Subscription>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type ? "gradient-bg" : "bg-[#15171D]",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
              )}
            >
              <div className='flex gap-x-2 items-center'>
                {listener.icon}
                <p>{listener.lable}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          ),
        )}
        <form onSubmit={onFormSubmit} className='flex flex-col gap-y-2'>
          <Textarea
            {...register("prompt")}
            className="bg-[#] outline-none border-none ring-0 focus:ring-0"
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart ai can use"
                : "Add a message you want send to your customers"
            }
          />
          <Input {...register("reply")}
          placeholder="Add an reply for comments (Optional" 
          className="bg-[] outline-none border-none ring-0 focus:ring-0"/>
          <Button 
          disabled={!Listener || isPending}
          className="gradient-bg w-full font-medium text-white disabled:cursor-not-allowed cursor-pointer">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
