"use server";
import { deleteImage } from "@/lib/cloudinary";
import {
  clearTemplateContentHistory,
  deleteTemplate,
  getTemplateById,
} from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTemplateAction = async (
  prevState: any,
  formData: FormData
) => {
  const {userId} = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const templateId = formData.get("templateId");
  if (!templateId) {
    return { success: false, error: "No template found" };
  }
  const template = await getTemplateById(
    templateId as string,
    userId
  );
  if (!template) {
    revalidatePath("/templates");
    return { success: false, error: "Template not found" };
  }
  await clearTemplateContentHistory(template.id);
  const deleted = await deleteTemplate(
    userId,
    templateId as string
  );
  if (!deleted) {
    revalidatePath("/templates");
    return { success: false, error: "Failed to delete template" };
  }
  deleteImage(template.icon_id as string);

  revalidatePath("/templates");
  revalidatePath("/templates/explore");
  return { success: true, error: null };
};
