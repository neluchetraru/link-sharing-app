"use client";

import { getUserData, getUserDataByShareId } from "@/app/auth-callback/actions";
import Preview from "@/app/preview/Preview";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const shareId = searchParams.get("id") as string;
  const { user } = useKindeBrowserClient();
  const {
    data: preview,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user-data-public"],
    queryFn: async () => await getUserDataByShareId(shareId),
    retry: true,
    retryDelay: 500,
  });

  if (isError) {
    return null;
  }

  if (!preview && isLoading) {
    return <Loader2 className="mx-auto mt-10 animate-spin" size={30} />;
  }

  if (!preview) {
    return null;
  }

  return (
    <div className="m-4 h-full p-4 min-h-[calc(100vh-8rem)] shadow-elevated rounded-md md:shadow-none md:rounded-none ">
      {user && (
        <div className="bg-white flex items-center justify-between p-4 md:shadow-elevated rounded-md ">
          <Link
            href="/configuration/links"
            className={cn(
              "flex items-center gap-x-1 text-gray-600 w-full md:w-auto",
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            Back to configuration
          </Link>
        </div>
      )}
      <div className="-z-10 hidden md:block md:absolute inset-x-0 top-0 bg-primary rounded-b-3xl h-1/3" />

      <Preview preview={preview} />
    </div>
  );
};

export default Page;
