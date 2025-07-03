"use server";
import { addContentHistory } from "@/lib/db";
import { deductCreditOnGenerate, getCreaditsBalance } from "@/lib/db/creadits";
import { addTemplatePopularity, getTemplateById } from "@/lib/db/templates";
import { prompt } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type TemplateForm = {
  prompt: string;
  context: string;
  placeholder?: string;
  required: boolean;
  type: string;
  label: string;
  id: string;
};

export const generateContentAction = async (
  prevState: any,
  formData: FormData
) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Please sign in to continue",
    };
  }
  const templateId = formData.get("templateId") as string;

  const template = await getTemplateById(templateId as string);
  if (!template) {
    return {
      success: false,
      error: "Template not found",
    };
  }

  const previousBalance = await getCreaditsBalance(userId);
  if (previousBalance.balance < 1) {
    return {
      success: false,
      error: "Insufficient balance",
    };
  }
  const updatedBalance = await deductCreditOnGenerate(userId);
  if (!updatedBalance) {
    return {
      success: false,
      error: "Insufficient balance",
    };
  }
  var aiPrompt = template.prompt as string;
  aiPrompt += " Contexs are given bellow\n";

  const forms = template.forms as TemplateForm[];
  for (let i = 0; i < forms.length; i++) {
    const id = forms[i].id;
    const value = formData.get(id as string);
    if (forms[i].required && (!value || value === "")) {
      return {
        success: false,
        error: "Enter all required fields correctly",
      };
    }
    if (value) {
      aiPrompt += `"${forms[i].context}" is "${value}"\n`;
    }
  }

  const aiResponse = await prompt(aiPrompt);
  const remainingBalance = updatedBalance.balance;

  if (!aiResponse) {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }

  await addContentHistory(userId, template.id, aiResponse);
  revalidatePath("/history");
  revalidatePath("/dashboard");
  if (template.public === true) await addTemplatePopularity(template.id);
  return {
    success: true,
    data: {
      response: aiResponse,
      remainingBalance: remainingBalance,
    },
  };
};
