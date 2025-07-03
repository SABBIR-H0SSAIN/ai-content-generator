"use server";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { getTemplateById, updateTemplate } from "@/lib/db/templates";
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
  .any()
  .transform((file) => {
    if (!(file instanceof File) || file.size === 0) return null;
    return file;
  })
  .refine(
    (file) => {
      if (file === null) return true;

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/svg+xml",
      ];
      return allowedTypes.includes(file.type) && file.size <= 1 * 1024 * 1024;
    },
    {
      message: "Only PNG, JPEG, WEBP, and SVG images under 1MB are allowed",
    }
  );

const zodTemplateSchema = z.object({
  title: z.string().trim().min(3).max(50),
  description: z.string().trim().min(10).max(200),
  icon: imageFileSchema.optional().nullable().default(null),
  prompt: z.string().trim().min(10).max(3000),
  public: z.boolean().optional().default(false),
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
});

export const editTemplateAction = async (
  prevState: any,
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const templateId = formData.get("templateId") as string;
  if (!templateId) {
    return {
      success: false,
      errors: {
        templateId: {
          _errors: ["Template ID is required"],
        },
      },
    };
  }

  const previousTemplate = await getTemplateById(templateId, userId);
  if (!previousTemplate) {
    return {
      success: false,
      errors: {
        templateId: {
          _errors: ["Template not found"],
        },
      },
    };
  }
  const data: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    prompt: formData.get("prompt"),
    forms: formData.get("forms") as string,
    public: formData.get("public") === "true",
  };
  if (formData.get("icon")) {
    data.icon = formData.get("icon") as File;
  }

  const parsedData = zodTemplateSchema.safeParse(data);

  if (!parsedData.success) {
    console.dir(parsedData.error.format(), { depth: null, colors: true });
    return {
      success: false,
      errors: parsedData.error.format(),
    };
  }

  const file = parsedData.data?.icon;
  const templateData = {
    title: parsedData.data.title,
    description: parsedData.data.description,
    prompt: parsedData.data.prompt,
    forms: JSON.stringify(
      parsedData.data.forms.map((form: any) => ({ ...form, id: randomId(10) }))
    ),
    public: parsedData.data.public,
  } as any;
  if (file) {
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
    templateData.icon = uploadResponse.secure_url;
    templateData.icon_id = uploadResponse.public_id;

    if (previousTemplate.icon_id) {
      deleteImage(previousTemplate.icon_id);
    }
  }

  const updatedTemplate = await updateTemplate(
    templateId,
    userId,
    templateData
  );
  if (!updatedTemplate) {
    return {
      success: false,
      errors: {
        templateId: {
          _errors: ["Failed to update template please try again"],
        },
      },
    };
  }

  revalidatePath("/templates");
  return {
    success: true,
    errors: null,
  };
};
