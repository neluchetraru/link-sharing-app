"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@radix-ui/react-select";
import { Facebook, Link, List, Trash } from "lucide-react";
import React from "react";

const PLTAFORMS = [
  { label: "Instagram", value: "instagram", icon: undefined },
  { label: "Facebook", value: "facebook", icon: Facebook },
  { label: "TikTok", value: "tiktok", icon: undefined },
  { label: "GitHub", value: "github", icon: undefined },
  { label: "LinkedIn", value: "linkedin", icon: undefined },
];

const SelectPlatform = () => {
  return (
    <Select>
      <SelectTrigger className="w-full items-start justify-start text-start bg-white">
        <SelectValue placeholder="Select platform" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {PLTAFORMS.map((platform) => (
            <SelectItem key={platform.value} value={platform.value}>
              {/* {platform.icon && <platform.icon size={15} />} */}
              <span>{platform.label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const LinkInput = () => {
  return (
    <div>
      <Label className="text-xs text-gray-600">Link</Label>
      <div className="relative w-full flex items-center text-gray-600">
        <Link className="absolute mx-4" size={14} />
        <Input
          className="focus-visible:ring-offset-0 focus-visible:ring-0 border-gray-300 pl-10"
          placeholder="https://google.com"
        />
      </div>
    </div>
  );
};

const LinkCard = ({}) => {
  return (
    <div className="bg-gray-100 px-3 py-4 rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm flex items-center gap-x-2 font-bold">
          <List size={13} /> Link #1
        </h3>
        <a
          href="#"
          className={
            "text-gray-500 text-sm hover:text-destructive transition-all"
          }
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Remove
        </a>
      </div>
      <div className="flex flex-col items-start gap-y-2">
        <SelectPlatform />
        <LinkInput />
      </div>
    </div>
  );
};

export default LinkCard;
