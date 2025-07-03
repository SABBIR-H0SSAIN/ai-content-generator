"use client";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const TemplateExploreCard = ({
  data,
  onDeleteButtonPress,
  onEditButtonPress,
}: {
  data: any;
  onDeleteButtonPress: () => void;
  onEditButtonPress: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="max-w-[250px] w-full">
      <div
        onClick={() => {
          router.push(`/templates/${data.id}`);
        }}
        className="h-full cursor-pointer flex flex-col justify-between p-4  shadow-lg rounded-md bg-white dark:bg-dark-3/80 hover:scale-104 transition-all duration-400 ease-out"
      >
        <div className="flex  justify-between ">
          <Image
            src={data.icon || "/icon_fallback.svg"}
            alt="logo"
            width={80}
            height={80}
            className=""
          />
        </div>
        <h1 className="text-lg font-semibold py-2 line-clamp-3 overflow-hidden">
          {data.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
          {data.description}
        </p>
        <div className="flex justify-evenly gap-4 pt-4 overflow-x-visible">
          <Button
            className="shadow-sm  hover:scale-105 transition-all duration-200 cursor-pointer"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEditButtonPress();
            }}
          >
            <Pencil />
            <span className="max-xs:hidden">Edit</span>
          </Button>
          <Button
            variant="outline"
            className="shadow-sm hover:scale-105 transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteButtonPress();
            }}
          >
            <Trash2 />
            <span className="max-xs:hidden">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateExploreCard;
