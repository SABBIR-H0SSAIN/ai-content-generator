"use client";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  return (
    <aside className="hidden sticky z-40 top-0 left-0 md:block h-screen bg-white dark:bg-dark-2 shadow-lg  p-2 lg:p-4 ">
      <SidebarLinks />
    </aside>
  );
};

export default Sidebar;
