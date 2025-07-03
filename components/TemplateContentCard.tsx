import { Sparkles } from "lucide-react";
import Image from "next/image";
import FormInput from "./FormInput";
import { Button } from "./ui/button";

const TemplateContentCard = ({ data }: { data: any }) => {
  return (
    <div className="shadow-lg rounded-lg flex flex-col flex-1 gap-4 p-5 max-w-[500px] w-full mx-auto bg-card">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <h1 className="text-2xl font-semibold mt-4">{data.name}</h1>
      <p className="text-md text-gray-600 dark:text-gray-400">
        {data.description}
      </p>
      <form className="flex flex-col gap-4">
        {data.form.map((input: any, index: number) => (
          <FormInput
            key={index}
            label={input.label}
            type={input.type}
            name={input.id}
            placeholder={input.placeholder}
            rows={input.rows}
            required={input.required}
          />
        ))}
      </form>
      <Button className="w-full text-white text-md mt-2 ">
        <Sparkles />
        Generate
      </Button>
    </div>
  );
};

export default TemplateContentCard;
