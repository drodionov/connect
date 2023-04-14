import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import FollowBar from "@/components/layout/FollowBar";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
      <>
        <Head>
          <title>Connect App [Tweeter Clone]</title>
          <meta name={'description'}
                content={'This Is The Best Twitter Clone Ever %)'}/>
        </Head>
        <div className="h-screen bg-black">
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar/>
              <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
              </div>
              <FollowBar/>
            </div>
          </div>
        </div>
      </>
  )
}

export default Layout;