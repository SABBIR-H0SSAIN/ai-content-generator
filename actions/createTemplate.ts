"use server";
import { MAX_ICON_FILE_SIZE } from "@/constants";
import { uploadImage } from "@/lib/cloudinary";
import { createNewTemplateByUser } from "@/lib/db/templates";
import { randomId } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface TemplateDataType {
  title: string;
  description: string;
  icon: File;
  prompt: string;
  forms: string;
  public: boolean;
}
const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(
        file.type
      ),
    "Only PNG, JPEG, and WEBP images are allowed"
  )
  .refine((file) => file.size <= MAX_ICON_FILE_SIZE, "Max file size is 1MB");

const zodTemplateSchema = z.object({
  title: z.string().trim().min(3).max(50),
  description: z.string().trim().min(10).max(200),
  icon: imageFileSchema,
  prompt: z.string().trim().min(10).max(3000),
  forms: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return JSON.parse(val.trim());
      }
      return val;
    },
    z.array(
      z.object({
        label: z.string().trim().min(1).max(50),
        type: z.enum(["input", "textarea"]),
        placeholder: z.string().trim().max(200).optional(),
        context: z.string().trim().min(10).max(150),
        required: z.boolean().optional().default(false),
        rowspan: z.coerce.number().int().min(1).max(10).optional().default(1),
      })
    )
  ),
  public: z.boolean().optional().default(false),
});

export const createTemplateAction = async (
  prevState: any,
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    prompt: formData.get("prompt"),
    forms: formData.get("forms") as string,
    public: formData.get("public") === "true",
  };

  const parsedData = zodTemplateSchema.safeParse(data);

  if (!parsedData.success) {
    console.dir(parsedData.error.format(), { depth: null, colors: true });
    return {
      errors: parsedData.error.format(),
    };
  }

  const file = parsedData.data.icon;

  const uploadResponse = await uploadImage(file);
  if (!uploadResponse) {
    return {
      success: false,
      errors: {
        icon: {
          _errors: ["Failed to upload image please try again"],
        },
      },
    };
  }
  const templateData = {
    title: parsedData.data.title,
    description: parsedData.data.description,
    prompt: parsedData.data.prompt,
    icon: uploadResponse.secure_url,
    icon_id: uploadResponse.public_id,
    forms: JSON.stringify(
      parsedData.data.forms.map((form: any) => ({ ...form, id: randomId(10) }))
    ),
    public: parsedData.data.public,
  };

  const template = await createNewTemplateByUser(userId, templateData as any);

  revalidatePath("/templates");
  return redirect("/templates");
};
