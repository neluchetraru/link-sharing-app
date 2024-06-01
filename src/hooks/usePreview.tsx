"use client";

import { Account, Link } from "@/lib/constants";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ContextType = {
  preview: PreviewType;
  setPreview: Dispatch<SetStateAction<PreviewType>>;
};

const PreviewContext = createContext<ContextType>({
  preview: {} as PreviewType,
  setPreview: () => {},
});

export type PreviewType = {
  account: Account;
  links: Link[];
};

export const PreviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [preview, setPreview] = useState<PreviewType>({} as PreviewType);
  return (
    <PreviewContext.Provider
      value={{
        preview,
        setPreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => useContext(PreviewContext);
