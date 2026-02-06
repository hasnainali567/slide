import Sidebar from "@/components/global/sidebar";
import Navbar from "@/components/global/navbar";
import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchUserAutomations, prefetchUserProfile } from "@/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  const query = new QueryClient();

  await prefetchUserProfile(query);
  await prefetchUserAutomations(query);



  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='p-3'>
      <Sidebar slug={slug} />
      <div className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'>
        <Navbar slug={slug} />
        {children}
      </div>
    </div>
    </HydrationBoundary>
  );
};

export default Layout;
