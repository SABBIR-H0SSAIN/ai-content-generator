import { DollarSign, PackageSearch, Plus, Save } from "lucide-react";
import { ReactNode } from "react";

export interface QuickActionProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: string;
  iconColor: string;
  actionMessage?: string;
}

export const quickActions: QuickActionProps[] = [
  {
    title: "Create Template",
    description: "Build your own AI content template",
    icon: <Plus className="w-8 h-8" />,
    href: "/templates/create",
    color: "gradient-dashboard-1",
    iconColor: "text-blue-100",
  },
  {
    title: "My Templates",
    description: "View and manage your templates",
    icon: <Save className="w-8 h-8" />,
    href: "/templates",
    color: "gradient-dashboard-2",
    iconColor: "text-green-100",
    actionMessage: "View Templates",
  },
  {
    title: "Explore Templates",
    description: "Discover community templates",
    icon: <PackageSearch className="w-8 h-8" />,
    href: "/templates/explore",
    color: "gradient-dashboard-3",
    iconColor: "text-purple-100",
    actionMessage: "Explore now",
  },
  {
    title: "Manage Credits",
    description: "View history and manage balance",
    icon: <DollarSign className="w-8 h-8" />,
    href: "/credit-management",
    color: "gradient-dashboard-4",
    iconColor: "text-orange-100",
    actionMessage: "Add Credits",
  },
];
