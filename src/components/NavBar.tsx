"use client";

import Logo from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleUser, Eye, LucideLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavBarProps {
  className?: string;
}
const NavBar = ({ className }: NavBarProps) => {
  const pathName = usePathname();

  return (
    <div
      className={cn(" bg-white flex items-center justify-between", className)}
    >
      <Logo />

      <div className="flex items-center gap-x-3">
        <Link
          href="/configuration/links"
          className={cn(
            "flex items-center gap-x-1 text-gray-600",
            buttonVariants({
              variant: "ghost",
            }),
            {
              "bg-primary/15 text-primary": pathName === "/configuration/links",
            }
          )}
        >
          <LucideLink size={15} />
          <span className="hidden sm:block">Links</span>
        </Link>
        <Link
          href="/configuration/account"
          className={cn(
            "flex items-center gap-x-1 text-gray-600",
            buttonVariants({
              variant: "ghost",
            }),
            {
              "bg-primary/15 text-primary":
                pathName === "/configuration/account",
            }
          )}
        >
          <CircleUser size={15} />
          <span className="hidden sm:block">Account</span>
        </Link>
      </div>

      <Link
        href="/preview"
        className={cn(
          "flex items-center gap-x-1 text-gray-600",
          buttonVariants({
            variant: "outline",
          }),
          {
            "bg-primary text-white": pathName === "/preview",
          }
        )}
      >
        <Eye size={15} />
        <span className="hidden sm:block">Preview</span>
      </Link>
    </div>
  );
};

export default NavBar;
