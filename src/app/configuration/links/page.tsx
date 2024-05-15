import LinksConfiguration from "@/app/configuration/links/LinksConfiguration";
import PhonePreview from "@/app/configuration/links/PhonePreview";
import React from "react";

const Page = () => {
  return (
    <div className="grid grid-cols-12 gap-x-4 h-full">
      <PhonePreview className="col-span-4" />
      <LinksConfiguration className="col-span-8" />
    </div>
  );
};

export default Page;
