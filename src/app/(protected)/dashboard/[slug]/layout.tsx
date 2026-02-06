import Sidebar from "@/components/global/sidebar";
import Navbar from "@/components/global/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

const Layout = async ({ children, params }: Props) => {
    const { slug } = await params;
  return (
    <div className='p-3'>
      <Sidebar slug={slug} />
      <div className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'>
        <Navbar slug={slug} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
