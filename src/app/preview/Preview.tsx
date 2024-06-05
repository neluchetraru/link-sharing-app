"use client";

import { toast } from "@/components/ui/use-toast";
import { PreviewType } from "@/hooks/usePreview";
import { PLATFORMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight, Share2 } from "lucide-react";
import React from "react";

const Preview = ({ preview }: { preview: PreviewType }) => {
  const { user } = useKindeBrowserClient();

  return (
    <div
      className={
        "md:mx-auto bg-white md:mt-10 flex flex-col items-center justify-center md:rounded-3xl md:shadow-elevated max-w-none py-8 px-10 md:max-w-sm"
      }
    >
      {user && (
        <Share2
          className="size-8 text-primary self-end cursor-pointer hover:opacity-90 transition-all"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Copied!",
              description:
                "Your profile link has been copied to your clipboard.",
            });
          }}
        />
      )}
      <div className="flex flex-col items-center mt-2">
        <img
          src={preview?.account?.picture}
          alt="account avatar"
          className="size-16 rounded-full ring-2 ring-primary"
        />
        <p className="mt-2 text-2xl font-bold text-slate-800 tracking-wide">
          {preview?.account?.name}
        </p>

        <p className="my-2 text-base text-wrap">{preview?.account?.email}</p>
      </div>
      <div className="flex flex-col items-center mt-5 gap-y-2 max-w-sm w-full">
        {preview?.links?.map((link, index) => {
          const platform = PLATFORMS.find((p) => p.value === link.platform);
          if (!platform) return null;

          return (
            <a
              href={`${platform.start}${link.profile}`}
              target="_blank"
              className={cn(
                `bg-${platform.value}`,
                "group flex items-center justify-between rounded-lg w-full text-white py-3 px-2 hover:bg-opacity-90 transition-all"
              )}
              key={platform.value}
            >
              <div className="flex gap-x-2 items-center">
                {<platform.icon className="size-5 fill-white" />}
                <p className="text-xs">{platform.label}</p>
              </div>
              <ArrowRight className="size-5 group-hover:translate-x-2 transition-all mr-3" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Preview;
