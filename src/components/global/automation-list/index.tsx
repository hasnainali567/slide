"use client";

import { usePath } from "@/hooks/use-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";

type Props = {};

const AutomationList = (props: Props) => {
  const { pathname } = usePath();

  //if no exist show empty state
  return (
    <div className='flex flex-col gap-y-3'>
      <Link
        href={`${pathname}/1029102`}
        className='bg-[#15171D] hover:opacity-80 transition duration-100 rounded-xl p-5 border radial-gradeint-bg flex border=[#545454'
      >
        <div className='flex flex-col flex-1 items-start'>
          <h2 className='text-xl font-semibold'>Automation Name</h2>
          <p className='text-[#9b9ca0] text-sm font-light mb-2'>
            This is from the comment
          </p>
          <div className='flex gap-x-2 flex-wrap mt-3'>
            <div
              className={cn(
                "rounded-full px-4 py-1 capitalize",
                true ? "bg-[#25E486]/15 border-2 border-[#25E486]" : "",
              )}
            >
              getstarted
            </div>
            <div
              className={cn(
                "rounded-full px-4 py-1 capitalize",
                true ? "bg-[#25E486]/15! border-2 border-[#25E486]" : "",
              )}
            >
              getstarted
            </div>
            <div
              className={cn(
                "rounded-full px-4 py-1 capitalize",
                (0 + 1) % 1 == 0 ? "bg-[#25E486]/15! border-2 border-[#25E486]" : "",
                (1 + 1) % 2 == 0 ? "bg-[#6E1ED2]/15! border-2 border-[#6E1ED2]" : "",
                (2 + 1) % 3 == 0 ? "bg-[#DBC91D]/15! border-2 border-[#DBC91D]" : "",
                (3 + 1) % 4 == 0 ? "bg-[#EE3C19]/15! border-2 border-[#EE3C19]" : "",
              )}
            >
              getstarted
            </div>
          </div>
          <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
              <p className="text-sm text-[#bfc0c3]">
                No Keywords
              </p>
          </div>
        </div>
          <div className=" flex flex-col justify-between">
              <p className="capitalize text-sm font-light text-[#9b9ca0]">
                Created on February 6th, 2026
              </p>
              <GradientButton className="w-full bg-[#202222] text-white hover:bg-[#202222]" type="BUTTON">Smart AI</GradientButton>
              <Button className="w-full bg-[#34bbbb] text-white hover:bg-[#202222]" >
                Standard
              </Button>
          </div>
      </Link>
    </div>
  );
};

export default AutomationList;
