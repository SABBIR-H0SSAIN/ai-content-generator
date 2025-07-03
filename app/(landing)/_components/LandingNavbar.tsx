"use client";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default LandingNavbar;
