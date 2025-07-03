"use client";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { AppLogo } from "./Navbar";
import { SidebarButton } from "./SidebarLinks";

const MobileSIdebar = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="px-4 md:hidden max-w-[264px]" side="left">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex flex-col">
          <AppLogo className="mx-auto pt-6 pb-4" />
          <SheetClose asChild>
            <div className="flex flex-col gap-2  font-semibold">
              {sidebarLinks.map((link) => (
                <SheetClose key={link.label} asChild>
                  <SidebarButton
                    key={link.label}
                    link={link}
                    active={pathname == link.route}
                  />
                </SheetClose>
              ))}
            </div>
          </SheetClose>
        </div>
     
      </SheetContent>
    </Sheet>
  );
};
export default MobileSIdebar;
