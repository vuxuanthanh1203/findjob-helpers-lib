import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

interface UploadOptions {
  public_id?: string;
  overwrite?: boolean;
  invalidate?: boolean;
  resource_type: "image" | "video" | "raw" | "auto";
  chunk_size?: number;
}

async function uploadToCloudinary(
  file: string,
  options: UploadOptions
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
  try {
    const result = await cloudinary.v2.uploader.upload(file, options);
    return result;
  } catch (error) {
    return error as UploadApiErrorResponse;
  }
}

export function uploadFile(
  file: string,
  resource_type: "image" | "video" | "raw" | "auto",
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
  chunk_size?: number
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
  return uploadToCloudinary(file, {
    public_id,
    overwrite,
    invalidate,
    resource_type,
    chunk_size
  });
}
