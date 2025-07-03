import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import navData from "./nav-links.json";

const DesktopNavbar = () => {
  return (
    <div className="hidden lg:flex items-center justify-between w-full h-16">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="EasyAi" width={38} height={38} />
        <span className="text-2xl font-semibold text-slate-900 dark:text-white">
          EasyAi
        </span>
      </div>

      <div className="flex items-center gap-8">
        {navData.navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4">
        {navData.ctaButtons.map((button, index) => (
          <Link key={index} href={button.href}>
            <Button
              variant={button.variant as any}
              className={button.className}
            >
              {button.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavbar;
