"use client";
import { usePath } from "@/hooks/use-nav";
import Item from "./items";
import {Separator} from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state.tsx";
import { BadgeQuestionMark } from "lucide-react";
import Subscription from "../subscription-plan";
import UpgradeCard from "./upgrade";
type Props = {
  slug: string;
};

const Sidebar = ({ slug }: Props) => {
  const { page } = usePath();
  return (
    <div
      className='w-[250px]
  border
  radail
  fixed
  left-0
  lg:inline-block
  border-[#545454] bg-linear-to-b from-[#768bdd] via-[#171717] to-[#768bdd] hidden bottom-0 top-0 m-3 rounded-3xl overflow-hidden  '
    >
      <div className='flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] opacity-90 bg-clip-padding backdrop-blur-3xl backdrop--blur__safari'>
        <div className='flex gap-x-2 items-center p-5 justify-center font-logo font-medium text-3xl gradient-bg bg-clip-text text-transparent'>
          Slide
        </div>
        <div className='flex flex-col py-3'>
          <Item page={page} slug={slug} />
        </div>
        <div className='px-16'>
          <Separator orientation='horizontal' className='bg-[#5c5c5f]' />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2 items-center">
            <ClerkAuthState />
            <p className="text-[#9b9ca0]">Profile</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <BadgeQuestionMark />
            <p className="text-[#9b9ca0]">Help</p>
          </div>
        </div>
        <Subscription type="FREE">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </Subscription>
      </div>
    </div>
  );
};

export default Sidebar;
