const CLOUDINARY_CLOUD = 'di7ynkdlm';
const CLOUDINARY_PRESET = 'cardyork';
const MAX_SIZE_BYTES = 1024 * 1024; // 1MB — same threshold as mobile
const QUALITY = 0.7; // 70% — same as mobile's `quality: 70`

/**
 * Compresses an image File using the browser Canvas API if it exceeds 1MB.
 * Mirrors AdjustUtils.optimizeImage() from the Flutter mobile app.
 * Returns a Blob ready for upload.
 */
export async function compressImage(file: File): Promise<Blob> {
  // Skip compression if already under threshold
  if (file.size <= MAX_SIZE_BYTES) return file;

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // fallback
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file); // fallback
            }
          },
          'image/jpeg',
          QUALITY,
        );
      } catch {
        resolve(file); // fallback on any error
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // fallback
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads an image File/Blob to Cloudinary using an unsigned upload preset.
 * Mirrors CloudinaryUtils.uploadImage() from the Flutter mobile app.
 * Returns the secure_url on success, or throws on failure.
 */
export async function uploadToCloudinary(file: File | Blob, filename?: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file, filename ?? 'image.jpg');
  formData.append('upload_preset', CLOUDINARY_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
    { method: 'POST', body: formData },
  );

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.secure_url as string;
}

/**
 * Convenience: compress then upload a File to Cloudinary.
 * Returns the secure_url.
 */
export async function compressAndUpload(file: File): Promise<string> {
  const compressed = await compressImage(file);
  return uploadToCloudinary(compressed, file.name);
}
