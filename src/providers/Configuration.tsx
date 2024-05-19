"use client";

import { useAccountConfiguration } from "@/hooks/useAccountConfiguration";
import { useLinksConfiguration } from "@/hooks/useLinksConfiguration";
import { createContext, useContext } from "react";

export const ConfigurationContext = createContext<{
  accountConfiguration: ReturnType<typeof useAccountConfiguration>;
  linksConfiguration: ReturnType<typeof useLinksConfiguration>;
} | null>(null);

export const ConfigurationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accountConfiguration = useAccountConfiguration();
  const linksConfiguration = useLinksConfiguration();
  return (
    <ConfigurationContext.Provider
      value={{
        accountConfiguration,
        linksConfiguration,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => {
  return useContext(ConfigurationContext);
};
