import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { CreditBalanceWithSpinner } from "./CreaditBalanceWithSpinner";
import MobileSIdebar from "./MobileSIdebar";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
    <div className={cn("flex items-center  gap-3 mx-2", className)}>
      <Image src="/logo.svg" alt="alt" width={38} height={38} />
      <span className="text-2xl font-semibold text-foreground">EasyAi</span>
    </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className=" w-full sticky top-0 left-0 right-0 z-50 bg-white dark:bg-dark-1 backdrop-blur-sm shadow-md  ">
      <div className="flex items-center justify-between container mx-auto px-4 h-16">
        <AppLogo />
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <CreditBalanceWithSpinner />
          <UserButton />
          <MobileSIdebar />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
