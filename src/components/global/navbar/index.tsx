"use client";
import Sheet from "../sheet";
import { PAGE_BREAD_CRUMBS } from "@/constant/pages";
import { usePath } from "@/hooks/use-nav";
import { BadgeQuestionMark, Menu } from "lucide-react";
import Item from "../sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state.tsx";
import Subscription from "../subscription-plan";
import UpgradeCard from "../sidebar/upgrade";
import CreateAutomation from "../create-aotumation";
import Search from "../search";
import Notifications from "../notification";
import MainBreadCrumb from "../main-bread-crumb";

type Props = {
  slug: string;
};

const Navbar = ({ slug }: Props) => {
  const { page } = usePath();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page === slug;
  return (
    currentPage && (
      <div className='flex flex-col  '>
        <div className='flex gap-x-3 lg:gap-x-5 justify-end items-center'>
          <span className='lg:hidden flex items-center flex-1 gap-x-2'>
            <Sheet side="left" trigger={<Menu className="cursor-pointer hover:text-primary" />} className='lg:hidden p-4'>
              <div className='flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] opacity-90 bg-clip-padding backdrop-blur-3xl backdrop--blur__safari'>
                <div className='flex gap-x-2 items-center p-5 justify-center font-logo font-medium text-3xl gradient-bg bg-clip-text text-transparent'>
                  Slide
                </div>
                <div className='flex flex-col py-3'>
                  <Item page={page} slug={slug} />
                </div>
                <div className='px-16'>
                  <Separator
                    orientation='horizontal'
                    className='bg-[#5c5c5f]'
                  />
                </div>
                <div className='px-3 flex flex-col gap-y-5'>
                  <div className='flex gap-x-2 items-center'>
                    <ClerkAuthState />
                    <p className='text-[#9b9ca0]'>Profile</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <BadgeQuestionMark />
                    <p className='text-[#9b9ca0]'>Help</p>
                  </div>
                </div>
                <Subscription type='FREE'>
                  <div className='flex-1 flex flex-col justify-end'>
                    <UpgradeCard />
                  </div>
                </Subscription>
              </div>
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb 
        page={page === slug ? 'Home' : page} slug={slug} />
      </div>
    )
  );
};

export default Navbar;
