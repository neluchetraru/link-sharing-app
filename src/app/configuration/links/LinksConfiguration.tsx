"use client";
import LinkCard from "@/app/configuration/links/LinkCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LinksConfigurationProps {
  className?: string;
}

const LinksConfiguration = ({ className }: LinksConfigurationProps) => {
  return (
    <ScrollArea
      className={cn(
        "w-full h-full flex flex-col gap-y-2 px-4 py-6 rounded-md shadow-md",
        className
      )}
    >
      <div className="h-full flex flex-col gap-y-2">
        <div className="space-y-2 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Customize your links
          </h1>
          <p className="text-gray-600 text-sm">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>{" "}
        <Button variant="outline" className="gap-x-1">
          {" "}
          <Plus size={15} /> Add new link{" "}
        </Button>
      </div>

      {/* LinkCards go here */}
      <div>
        <LinkCard />
      </div>

      <div className="absolute inset-x-0 bottom-0  flex justify-end py-6 border-t border-t-gray-300">
        <Button>Save</Button>
      </div>
    </ScrollArea>
  );
};

export default LinksConfiguration;
