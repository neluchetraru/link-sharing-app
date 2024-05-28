"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { PLATFORMS } from "@/hooks/useLinksConfiguration";
import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/Configuration";

interface PhonePreviewProps {
  className?: string;
}

const PhonePreview = ({ className }: PhonePreviewProps) => {
  const configuration = useConfiguration();
  const watchAccount = configuration?.accountConfiguration?.form.watch;
  const watchLinks = configuration?.linksConfiguration?.form.watch;

  const account = watchAccount && watchAccount();
  const links = (watchLinks && watchLinks().links) || [];
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative aspect-[9/16] lg:max-h-[calc(100vh-10rem)] max-h-[50vh] overflow-hidden">
        <img src="/phone.jpg" alt="" className="" />
        <div className="absolute inset-x-0 flex flex-col gap-y-1 left-1/2 -translate-x-1/2 w-8/12 top-[10%] max-h-[calc(50vh-3rem)] overflow-hidden">
          <div className="flex flex-col items-center mt-2">
            {account?.avatar ? (
              <img
                src={account.avatar}
                alt="account avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <Skeleton className="w-10 h-10 rounded-full" />
            )}
            {account?.firstName && account?.lastName ? (
              <p className="mt-2 text-xs">
                {account.firstName} {account.lastName}
              </p>
            ) : (
              <Skeleton className="md:w-32 w-20 h-4 mt-2" />
            )}

            {account?.email ? (
              <p className="mt-1 text-xs text-wrap">{account.email}</p>
            ) : (
              <Skeleton className="w-20 h-4 mt-1" />
            )}
          </div>
          <div className="flex flex-col items-center mt-5 gap-y-2 ">
            {links?.map((link, index) => {
              const platform = PLATFORMS.find((p) => p.value === link.platform);
              if (!platform) return null;

              return (
                <a
                  href={`${platform.start}${link.profile}`}
                  target="_blank"
                  className={cn(
                    `bg-${platform.tw}`,
                    "flex items-center gap-x-2 rounded-lg w-full text-white py-1 px-2"
                  )}
                  key={platform.value}
                >
                  {<platform.icon className="size-5 fill-white" />}
                  <p className="text-xs">{platform.label}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
