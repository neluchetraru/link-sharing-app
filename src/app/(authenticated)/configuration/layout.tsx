"use client";
import { getUserData } from "@/app/auth-callback/actions";
import { usePreview } from "@/hooks/usePreview";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useQuery } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect } from "react";

// bg-instagram bg-facebook bg-tiktok bg-github bg-linkedin bg-youtube bg-tiktok
// text-instagram text-facebook text-tiktok text-github text-linkedin text-youtube text-tiktok
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

  if (isLoading) {
    return <Loader2 className="mx-auto mt-10 animate-spin" size={30} />;
  }

  if (isError) {
    return null;
  }
  return (
    <div className="grid grid-cols-12 md:gap-x-4 mx-4 h-full gap-y-4">
      {children}
    </div>
  );
};

export default Layout;
