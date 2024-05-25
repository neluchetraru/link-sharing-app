import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ConfigurationSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="w-3/5 h-6" />
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-full h-10 my-3" />
      <Skeleton className="w-full h-40" />
    </div>
  );
};

export default ConfigurationSkeleton;
