import type { QuickActionProps } from "@/constants/dashboard-quick-actions";
import Link from "next/link";



const QuickActionCard = ({  
    title,
    description,
    icon,
    href,
    color,
    iconColor,
    actionMessage="Get Started",
 }: QuickActionProps) => {
  return (
    <Link href={href}>
      <div
        className={`group xs:max-w-[300px] relative overflow-hidden rounded-xl p-6 ${color} text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col`}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="relative z-10 space-y-4 flex-1 flex flex-col">
          <div
            className={`w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center ${iconColor} backdrop-blur-sm`}
          >
            {icon}
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors mt-auto">
            <span>{actionMessage}</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;
