"use client";
import { getUserData } from "@/app/auth-callback/actions";
import { usePreview } from "@/hooks/usePreview";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, isLoading } = useKindeBrowserClient();
  const { data: account, isError } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => await getUserData(user as KindeUser),
    retry: true,
    retryDelay: 500,
  });

  const { setPreview } = usePreview();
  useEffect(() => {
    if (account && !isError) {
      setPreview(account);
    }
  }, [account, setPreview, isError]);

  if (isLoading || isError) {
    return null;
  }
  return (
    <div className="grid grid-cols-12 md:gap-x-4 mx-4 h-full gap-y-4">
      {children}
    </div>
  );
};

export default Layout;
