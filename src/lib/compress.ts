export type OutputType = "image/jpeg" | "image/png" | "image/webp";

export type CompressOptions = {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  outputType: OutputType;
};

export type CompressResult = {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  newSize: number;
  filename: string;
};

export const MAX_FILE_BYTES = 80 * 1024 * 1024;
export const WARN_FILE_BYTES = 25 * 1024 * 1024;

const EXT: Record<OutputType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function outputExt(type: OutputType): string {
  return EXT[type];
}

export function isAcceptedImage(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  const typeOk =
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/png" ||
    type === "image/webp" ||
    type === "image/bmp" ||
    type === "image/gif";
  const extOk = /\.(jpe?g|png|webp|bmp|gif)$/.test(name);
  return typeOk || extOk;
}

export async function assertSafeImage(file: File): Promise<void> {
  if (file.size <= 0) throw new Error("This file is empty.");
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("This file is too large for this device’s memory. Try a smaller image.");
  }
  if (!isAcceptedImage(file)) {
    throw new Error("Only JPG, PNG, WebP, BMP, or GIF files are accepted.");
  }
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!looksLikeImage(head)) {
    throw new Error("This file does not look like a valid image.");
  }
}

function looksLikeImage(head: Uint8Array): boolean {
  if (head.length < 4) return false;
  // JPEG
  if (head[0] === 0xff && head[1] === 0xd8) return true;
  // PNG
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return true;
  // GIF
  if (head[0] === 0x47 && head[1] === 0x49 && head[2] === 0x46) return true;
  // BMP
  if (head[0] === 0x42 && head[1] === 0x4d) return true;
  // WEBP: RIFF....WEBP
  if (
    head[0] === 0x52 &&
    head[1] === 0x49 &&
    head[2] === 0x46 &&
    head[3] === 0x46 &&
    head[8] === 0x57 &&
    head[9] === 0x45 &&
    head[10] === 0x42 &&
    head[11] === 0x50
  ) {
    return true;
  }
  return false;
}

function fitSize(width: number, height: number, maxWidth?: number, maxHeight?: number) {
  let scale = 1;
  if (maxWidth && width > maxWidth) scale = Math.min(scale, maxWidth / width);
  if (maxHeight && height > maxHeight) scale = Math.min(scale, maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not encode this image on this device."));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

export async function supportsWebp(): Promise<boolean> {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  try {
    const blob = await toBlob(canvas, "image/webp", 0.8);
    return blob.type === "image/webp" && blob.size > 0;
  } catch {
    return false;
  }
}

function memoryError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);
  if (/memory|allocation|source image is too large/i.test(message)) {
    return new Error("This image is too large for this device’s memory. Try a smaller photo or set a max width.");
  }
  return new Error("Could not read this image in the browser.");
}

export async function compressImage(file: File, opts: CompressOptions): Promise<CompressResult> {
  await assertSafeImage(file);

  const quality = Math.min(1, Math.max(0.1, opts.quality));
  let outputType = opts.outputType;
  if (outputType === "image/webp") {
    const ok = await supportsWebp();
    if (!ok) outputType = "image/jpeg";
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch (first) {
    try {
      bitmap = await createImageBitmap(file);
    } catch (second) {
      throw memoryError(second ?? first);
    }
  }

  try {
    const fitted = fitSize(bitmap.width, bitmap.height, opts.maxWidth, opts.maxHeight);
    const canvas = document.createElement("canvas");
    canvas.width = fitted.width;
    canvas.height = fitted.height;
    const ctx = canvas.getContext("2d", { alpha: outputType !== "image/jpeg" });
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    if (outputType === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await toBlob(canvas, outputType, quality);
    canvas.width = 0;
    canvas.height = 0;

    const stem = (file.name.split(/[/\\]/).pop() ?? "image").replace(/\.[^.]+$/, "") || "image";
    return {
      blob,
      width: fitted.width,
      height: fitted.height,
      originalSize: file.size,
      newSize: blob.size,
      filename: `${stem}-crush.${EXT[outputType]}`,
    };
  } finally {
    bitmap.close();
  }
}
