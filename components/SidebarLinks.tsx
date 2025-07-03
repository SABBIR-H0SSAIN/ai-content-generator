"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
export const SidebarButton = ({
  link,
  active,
}: {
  active: boolean;
  link: (typeof sidebarLinks)[0];
}) => {
  const router = useRouter();
  const { route, label, icon } = link;
  return (
    <div
      onClick={() => router.push(route)}
      className={cn(
        "flex flex-row lg:w-full gap-2 p-2 max-md:px-4 lg:py-3 lg:px-4 cursor-pointer hover:bg-primary/10 rounded-lg  text-gray-700 dark:text-white",
        {
          "bg-primary hover:bg-primary text-white": active,
        }
      )} 
    >
      {icon}
      <span className="text-lg max-md:block max-lg:hidden">{label}</span>
    </div>
  );
};
const SidebarLinks = () => {
  const pathname = usePathname();
  const isActive = (route: string) => {
    return pathname == route || (pathname.endsWith('/edit') && route == '/templates');
  };
  return (
    <div className="flex flex-col pt-5 gap-2 justify-center items-center lg:items-start  font-semibold">
      {sidebarLinks.map((link) => (
        <SidebarButton
          key={link.label}
          link={link}
          active={isActive(link.route)}
        />
      ))}
    </div>
  );
};

export default SidebarLinks;
