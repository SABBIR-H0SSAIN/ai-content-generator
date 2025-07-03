"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

import FormInput from "@/components/FormInput";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { useState } from "react";

interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  forms: Array<{
    id: string;
    label: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    rowspan?: number;
  }>;
}

interface ActionState {
  success: boolean;
  data: {
    response: string | null;
    remainingBalance: number | null;
  };
  error: string | null;
}

const ContentGenerationFormCard = ({
  template,
  templateId,
  balance,
  updateBalance,
  actionState,
}: {
  template: Template;
  templateId: string;
  balance: number;
  updateBalance: (balance: number) => void;
  actionState: [ActionState, (formData: FormData) => void, boolean];
}) => {
  const [, action, loading] = actionState;
  const inputs: Record<string, string> = {};
  template.forms.forEach((input) => {
    inputs[input.id] = "";
  });
  const [formState, setFormState] = useState<Record<string, string>>(inputs);

  return (
    <div className="xl:sticky z-50 xl:top-0 shadow-lg mb-5 h-full rounded-lg gap-4 p-5 w-full lg:min-w-[400px] max-w-[450px] mx-auto  bg-card">
      <div className="flex flex-col gap-4">
        <Image src={template.icon} height={120} width={120} alt="logo" />
        <h1 className="text-2xl font-semibold mt-4">{template.title}</h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          {template.description}
        </p>
        <form action={action} className="flex flex-col gap-4">
          {template.forms.map((input, index: number) => (
            <div key={index}>
              <FormInput
                label={input.label}
                type={input.type}
                required={input?.required}
                placeholder={input.placeholder || ""}
                name={input.id}
                rows={input.rowspan}
                value={formState[input.id]}
                onChange={(e) => {
                  setFormState({ ...formState, [input.id]: e.target.value });
                }}
              />
            </div>
          ))}
          <input type="hidden" name="templateId" value={templateId} />

          <Button
            onClick={() => {
              if (!balance) return;
              if (balance > 0) updateBalance(balance - 1);
            }}
            disabled={loading}
            type="submit"
            className="w-full text-white text-md mt-2 "
          >
            {loading ? (
              <Spinner className="text-white size-4 font-bold animate-spin" />
            ) : (
              <Sparkles />
            )}
            {loading ? "Generating" : "Generate"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContentGenerationFormCard;
