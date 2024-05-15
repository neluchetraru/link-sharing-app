import { cn } from "@/lib/utils";
import React from "react";

interface PhonePreviewProps {
  className?: string;
}

const PhonePreview = ({ className }: PhonePreviewProps) => {
  return <div className={cn("", className)}>PhonePreview</div>;
};

export default PhonePreview;
