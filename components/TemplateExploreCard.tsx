import Image from "next/image";
import Link from "next/link";

const TemplateExploreCard = ({ data }: { data: any }) => {
  return (
    <Link href={`/templates/${data.id}`}>
      <div className="h-full cursor-pointer flex flex-col justify-between p-4 max-w-[250px] shadow-lg rounded-md bg-white dark:bg-dark-3/80 hover:scale-105 transition-all duration-400">
        <div className="flex  justify-between ">
          <Image
            src={data.icon || "/logo.svg"}
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
      </div>
    </Link>
  );
};

export default TemplateExploreCard;
