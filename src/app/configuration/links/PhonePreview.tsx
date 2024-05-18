"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import React from "react";

interface PhonePreviewProps {
  className?: string;
}

const PhonePreview = ({ className }: PhonePreviewProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative aspect-[9/16] lg:max-h-[calc(100vh-10rem)] max-h-[50vh]">
        <img src="/phone.jpg" alt="" className="" />
        <div
          className="absolute inset-x-0 flex flex-col gap-y-1 left-1/2 -translate-x-1/2 w-8/12 top-[10%]"
          style={{}}
        >
          <div className="flex py-2 px-3 items-center gap-x-2 bg-gray-950 text-muted rounded-md select-none">
            <Github size={13} />
            <span className="text-xs">GitHub</span>
            <ArrowRight size={13} className="ml-auto" />
          </div>
          <div className="flex py-2 px-3 items-center gap-x-2 bg-pink-500 text-muted rounded-md select-none">
            <Instagram size={13} />
            <span className="text-xs">Instagram</span>
            <ArrowRight size={13} className="ml-auto" />
          </div>
          <div className="flex py-2 px-3 items-center gap-x-2 bg-blue-500 text-muted rounded-md select-none">
            <Linkedin size={13} />
            <span className="text-xs">LinkedIn</span>
            <ArrowRight size={13} className="ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
