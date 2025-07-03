import {
  History,
  LayoutDashboard,
  PackageSearch,
  Save,
  SquarePlus,
} from "lucide-react";
import Image from "next/image";

export const sidebarLinks = [
  {
    icon: <LayoutDashboard />,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <SquarePlus />,
    route: "/templates/create",
    label: "Create Template",
  },
  {
    icon: <Save />,
    route: "/templates",
    label: "My Templates",
  },
  {
    icon: <History />,
    route: "/history",
    label: "Content History",
  },

  {
    icon: <PackageSearch />,
    route: "/templates/explore",
    label: "Explore Templates",
  },
  {
    icon: <Image alt="star" src="/star.png" height={32} width={32} />,
    route: "/credit-management",
    label: "Manage Creadits",
  },
];
