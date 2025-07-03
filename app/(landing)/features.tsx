import { BookOpen, Code, Hash, MessageSquare, PenTool } from "lucide-react";
import { ReactNode } from "react";

export type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  href: string;
};

export const features: Feature[] = [
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Blog Content",
    description:
      "Generate engaging blog posts, titles, and topic ideas with AI",
    color: "from-blue-500 to-purple-600",
    href: "/templates/explore",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Product Review Generator",
    description:
      "Create detailed and persuasive product reviews for e-commerce or blogs.",
    color: "from-red-500 to-pink-600",
    href: "/templates/explore",
  },
  {
    icon: <Hash className="w-6 h-6" />,
    title: "Social Media Caption Generator",
    description: "Generate catchy captions for all your social media posts.",
    color: "from-purple-500 to-indigo-600",
    href: "/templates/explore",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Code Generation",
    description: "Write code in any programming language with AI assistance",
    color: "from-green-500 to-teal-600",
    href: "/templates/explore",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Grammar Check",
    description: "Perfect your writing with AI-powered grammar correction",
    color: "from-orange-500 to-red-600",
    href: "/templates/explore",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Custom Templates",
    description: "Create and share your own AI content templates",
    color: "from-indigo-500 to-blue-600",
    href: "/templates/explore",
  },
];
