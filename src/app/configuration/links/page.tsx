import LinksConfiguration from "@/app/configuration/links/LinksConfiguration";
import PhonePreview from "@/app/configuration/links/PhonePreview";
import React from "react";

const Page = () => {
  return (
    <div className="grid grid-cols-12 gap-x-4 mx-4 ">
      <PhonePreview className="md:col-span-5 p-4 shadow-elevated rounded-md col-span-full" />
      <LinksConfiguration className="md:col-span-7 p-4 shadow-elevated rounded-md col-span-full" />
    </div>
  );
};

export default Page;
