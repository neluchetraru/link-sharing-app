import Logo from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleUser, LucideLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavBarProps {
  className?: string;
}
const NavBar = ({ className }: NavBarProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Logo />

      <div className="sm:flex items-center gap-x-3 hidden">
        <Link
          href="/configuration/links"
          className={cn(
            "flex items-center gap-x-1 text-gray-600",
            buttonVariants({
              variant: "ghost",
            })
          )}
        >
          <LucideLink size={15} />
          <span>Links</span>
        </Link>
        <Link
          href="/configuration/account"
          className={cn(
            "flex items-center gap-x-1 text-gray-600",
            buttonVariants({
              variant: "ghost",
            })
          )}
        >
          <CircleUser size={15} />
          <span>Account</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          href="/preview"
          className={cn(
            "flex items-center gap-x-1 text-gray-600",
            buttonVariants({
              variant: "outline",
            })
          )}
        >
          Preview
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
