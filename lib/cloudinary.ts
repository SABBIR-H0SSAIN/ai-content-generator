import { config } from "@/config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export const uploadImage = async (
  file: File,
  folder: string = "template_icons"
): Promise<UploadApiResponse | null> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await new Promise(async (resolve) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder,
        },
        (error, result) => {
          if (error || !result) return resolve(null);
          return resolve(result);
        }
      )
      .end(buffer);
  });

  return response as UploadApiResponse | null;
};

export const deleteImage = async (publicId: string) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch {
    return null;
  }
};

export const deleteAllIcons = async () => {
  const result = await cloudinary.api.delete_resources_by_prefix(
    "template_icons"
  );
  return result;
};
