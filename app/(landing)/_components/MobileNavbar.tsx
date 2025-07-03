"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import navData from "./nav-links.json";

const MobileNavbar = () => {
  return (
    <div className="lg:hidden flex items-center justify-between w-full h-16">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="EasyAi" width={38} height={38} />
        <span className="text-2xl font-semibold text-slate-900 dark:text-white">
          EasyAi
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 dark:text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                <Image src="/logo.svg" alt="EasyAi" width={32} height={32} />
                <span className="text-xl font-semibold">EasyAi</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navData.navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                {navData.ctaButtons.map((button, index) => (
                  <Link key={index} href={button.href}>
                    <Button
                      variant={button.variant as any}
                      className={`w-full justify-start ${
                        button.variant === "ghost"
                          ? "text-slate-700 dark:text-slate-300"
                          : button.className
                      }`}
                    >
                      {button.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavbar;
