"use client";
import { getAuthStatus } from "@/app/auth-callback/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [redirect, setRedirect] = useState<string>();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });
  React.useEffect(() => {
    const redirect = localStorage.getItem("redirect");
    if (redirect) {
      setRedirect(redirect);
    }
  }, []);

  if (data?.success) {
    if (redirect) {
      localStorage.removeItem("redirect");
      router.push(redirect);
    } else router.push("/");
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
