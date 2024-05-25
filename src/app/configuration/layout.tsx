import PhonePreview from "@/app/configuration/links/PhonePreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-12 md:gap-x-4 mx-4 h-full gap-y-4">
      <PhonePreview className="lg:col-span-5 p-4 shadow-elevated rounded-md col-span-full" />
      <ScrollArea
        className={cn(
          "lg:col-span-7 p-4 shadow-elevated col-span-full w-full flex flex-col gap-y-2 px-4 py-6 rounded-md h-full md:h-[calc(100vh-8rem)]"
        )}
      >
        {children}
      </ScrollArea>
    </div>
  );
};

export default Layout;
