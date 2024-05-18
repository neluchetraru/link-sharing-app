"use client";
import { FormValues } from "@/app/configuration/links/LinksConfiguration";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Facebook,
  Github,
  Instagram,
  Link,
  Linkedin,
  List,
  Trash,
} from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export const PLATFORMS = [
  {
    label: "Instagram",
    value: "instagram",
    icon: <Instagram className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "Facebook",
    value: "facebook",
    icon: <Facebook className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "TikTok",
    value: "tiktok",
    icon: <Facebook className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "GitHub",
    value: "github",
    icon: <Github className="w-4 h-4 text-gray-500" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: <Linkedin className="w-4 h-4 text-gray-500" />,
  },
] as const;

const SelectPlatform = ({
  register,
  index,
}: {
  register: UseFormRegister<FormValues>;
  index: number;
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<
    (typeof PLATFORMS)[number] | undefined
  >();
  return (
    <Select>
      <Label className="text-xs text-gray-600">Platform</Label>
      <SelectTrigger className="w-full relative focus-visible:ring-offset-0 focus-visible:ring-0 border-gray-300 flex items-center text-gray-600">
        <SelectValue
          placeholder="Select platform"
          asChild
          {...register(`links.${index}.platform`)}
        >
          <div className="flex items-center gap-x-3">
            {selectedPlatform?.icon}
            <span>{selectedPlatform?.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {PLATFORMS.map((platform) => (
            <SelectItem value={platform.value} key={platform.value}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const LinkInput = ({
  register,
  index,
}: {
  register: UseFormRegister<FormValues>;
  index: number;
}) => {
  return (
    <div className="w-full">
      <Label className="text-xs text-gray-600">Link</Label>
      <div className="relative w-full flex items-center text-gray-600">
        <Link className="absolute mx-4" size={14} />
        <Input
          className="focus-visible:ring-offset-0 focus-visible:ring-0 border-gray-300 pl-10"
          placeholder="https://google.com"
          {...register(`links.${index}.url` as const)}
        />
      </div>
    </div>
  );
};

const LinkCard = ({
  index,
  onRemove,
  register,
}: {
  index: number;
  onRemove: (arg0: number) => void;

  register: UseFormRegister<FormValues>;
}) => {
  return (
    <div className="bg-gray-100 px-3 py-4 rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm flex items-center gap-x-2 font-bold">
          <List size={13} /> Link #{index + 1}
        </h3>
        <a
          href="#"
          className={
            "text-gray-500 text-sm hover:text-destructive transition-all"
          }
          onClick={(e) => {
            e.preventDefault();
            onRemove(index);
          }}
        >
          Remove
        </a>
      </div>
      <div className="flex flex-col items-start gap-y-2 pt-4">
        <SelectPlatform register={register} index={index} />
        <LinkInput register={register} index={index} />
      </div>
    </div>
  );
};

export default LinkCard;
