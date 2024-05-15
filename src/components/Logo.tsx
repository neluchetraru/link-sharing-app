import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { LucideLink2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-x-1 group">
      <div className="text-white bg-primary p-1 rounded-md group-hover:bg-primary/90 transition-all">
        <LucideLink2 size={16} />
      </div>
      <span className="font-bold tracking-tight text-lg text-gray-800">
        devlinks
      </span>
    </Link>
  );
};

export default Logo;
