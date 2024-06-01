import NavBar from "@/components/NavBar";
import { PreviewProvider } from "@/hooks/usePreview";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!isAuthenticated || !user) {
    redirect("/api/auth/login");
  }

  return (
    <PreviewProvider>
      <NavBar className="m-4 p-4 shadow-elevated rounded-md" />
      {children}
    </PreviewProvider>
  );
};

export default Layout;
