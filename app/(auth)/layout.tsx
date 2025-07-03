import ClerkProvider from "@/providers/ClerkProvider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Layout;
