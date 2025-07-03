"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Searchbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (text && text != "") {
      params.set("query", text);

      params.delete("page");
    } else {
      params.delete("query");
      params.delete("page");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="bg-white flex flex-row items-center px-2 rounded-md min-w-50 md:w-100 gap-2">
      <Search className="text-black shrink-0" />
      <input
        type="text"
        className="w-full hover:outline-none focus:outline-none focus:ring-0 h-10  text-black"
        defaultValue={searchParams.get("query")?.toString() || ""}
        onChange={(e) => handleSearch(e.target.value.trim())}
      />
    </div>
  );
};

export default Searchbar;
