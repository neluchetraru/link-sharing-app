"use client";

import Preview from "@/app/preview/Preview";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const shareId = searchParams.get("id") as string;

  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return null;
  }

  // if (!account || (!links && (!isLoadingAccount || !isLoadingLinks))) {
  //   return <div>User not found</div>;
  // }

  return (
    <div className="mx-4 h-full p-4 min-h-[calc(100vh-8rem)] shadow-elevated rounded-md md:shadow-none md:rounded-none ">
      <div className="-z-10 hidden md:block md:absolute inset-x-0 top-0 bg-primary rounded-b-3xl h-1/3" />
      {/* <Preview account={account} links={links} shareId={shareId} /> */}
    </div>
  );
};

export default Page;
