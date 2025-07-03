import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ClerkProvider from "@/providers/ClerkProvider";
import CreaditBalanceProvider from "@/providers/CreaditBalanceProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <CreaditBalanceProvider>
        <div className="w-full h-screen flex flex-col overflow-hidden">
          <header>
            <Navbar />
          </header>

          <div className="flex overflow-hidden ">
            <Sidebar />

            <main className="flex-1  overflow-y-auto ">{children}</main>
          </div>
        </div>
      </CreaditBalanceProvider>
    </ClerkProvider>
  );
};

export default Layout;
