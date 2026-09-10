import {
  compressImage,
  type CompressResult,
  type OutputType,
} from "@/lib/compress";

/** Quality ladder from browser-image-compression: try high JPEG first, then drop. */
export const QUALITY_STEPS = [0.9, 0.82, 0.74, 0.66, 0.58, 0.5, 0.42, 0.36] as const;

/** Long-edge caps, largest first. Never upscale. */
export const EDGE_STEPS = [2560, 1920, 1600, 1280, 1024, 900, 720] as const;

export const MAX_ENCODES = 14;

/** PNG at a tight byte cap is almost always the wrong container. Switch and say so. */
export const PNG_FORCE_JPEG_UNDER = 500 * 1024;

export type SizePreset = {
  id: string;
  label: string;
  bytes: number;
  hint?: string;
};

export const SIZE_PRESETS: SizePreset[] = [
  { id: "50kb", label: "50 KB", bytes: 50 * 1024, hint: "portals" },
  { id: "200kb", label: "200 KB", bytes: 200 * 1024, hint: "WhatsApp-safe" },
  { id: "500kb", label: "500 KB", bytes: 500 * 1024 },
  { id: "1mb", label: "1 MB", bytes: 1 * 1024 * 1024, hint: "WhatsApp-safe" },
  { id: "2mb", label: "2 MB", bytes: 2 * 1024 * 1024, hint: "forms" },
  { id: "5mb", label: "5 MB", bytes: 5 * 1024 * 1024 },
  { id: "10mb", label: "10 MB", bytes: 10 * 1024 * 1024 },
  { id: "18mb", label: "18 MB", bytes: 18 * 1024 * 1024, hint: "Gmail-ish file" },
];

export type TargetResult = CompressResult & {
  iterations: number;
  edgeUsed: number;
  qualityUsed: number;
  hit: boolean;
  resized: boolean;
  pngToJpeg: boolean;
  outputType: OutputType;
};

export function parseTargetBytes(value: number, unit: "KB" | "MB"): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return unit === "MB" ? Math.round(value * 1024 * 1024) : Math.round(value * 1024);
}

function isPngFile(file: File): boolean {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return type === "image/png" || name.endsWith(".png");
}

function isHeicName(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    name.endsWith(".heic") ||
    name.endsWith(".heif") ||
    type === "image/heic" ||
    type === "image/heif"
  );
}

async function sourceSize(file: File): Promise<{ width: number; height: number }> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch {
    bitmap = await createImageBitmap(file);
  }
  const size = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  return size;
}

/**
 * Fit `file` under `targetBytes` by calling the existing Canvas compressor.
 * Does not rewrite compress.ts. Caps at MAX_ENCODES encodes.
 * Algorithm shape matches Donaldcwl/browser-image-compression (MIT):
 * quality down, then long edge down. Package is not installed.
 */
export async function compressToTarget(
  file: File,
  targetBytes: number,
  preferred: OutputType = "image/jpeg",
): Promise<TargetResult> {
  if (isHeicName(file)) {
    throw new Error("HEIC is a different codec. This page only re-encodes JPG, PNG and WebP stills.");
  }
  if (!Number.isFinite(targetBytes) || targetBytes < 1024) {
    throw new Error("Pick a target of at least 1 KB.");
  }

  let outputType: OutputType = preferred;
  let pngToJpeg = false;
  if (isPngFile(file) && targetBytes < PNG_FORCE_JPEG_UNDER) {
    outputType = "image/jpeg";
    pngToJpeg = true;
  }

  const original = await sourceSize(file);
  let best: CompressResult | null = null;
  let bestQ = QUALITY_STEPS[0];
  let bestEdge = EDGE_STEPS[0];
  let iterations = 0;
  let hit = false;

  const runLadder = async (type: OutputType) => {
    outer: for (const edge of EDGE_STEPS) {
      for (const quality of QUALITY_STEPS) {
        if (iterations >= MAX_ENCODES) break outer;
        const result = await compressImage(file, {
          quality,
          maxWidth: edge,
          maxHeight: edge,
          outputType: type,
        });
        iterations += 1;
        if (!best || result.newSize < best.newSize) {
          best = result;
          bestQ = quality;
          bestEdge = edge;
        }
        if (result.newSize <= targetBytes) {
          best = result;
          bestQ = quality;
          bestEdge = edge;
          hit = true;
          break outer;
        }
      }
    }
  };

  await runLadder(outputType);

  if (!hit && isPngFile(file) && outputType === "image/png" && iterations < MAX_ENCODES) {
    pngToJpeg = true;
    outputType = "image/jpeg";
    await runLadder("image/jpeg");
  }

  if (!best) throw new Error("Could not encode this image on this device.");

  return {
    ...best,
    iterations,
    edgeUsed: bestEdge,
    qualityUsed: bestQ,
    hit,
    resized: best.width < original.width || best.height < original.height,
    pngToJpeg,
    outputType,
  };
}
