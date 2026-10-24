export const MAX_PHOTOS = 3;
export const MAX_PHOTO_BYTES = 1024 * 1024;
export const MAX_TOTAL_PHOTO_BYTES = 2 * 1024 * 1024;
export const MAX_QUOTE_BODY_BYTES = 3_000_000;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export type PhotoPayload = { name: string; type: string; content: string };
export function photoSelectionError(
  files: readonly { size: number; type: string }[],
): string | undefined {
  if (files.length > MAX_PHOTOS) return "Ajoutez au maximum 3 photographies.";
  if (files.some((f) => !PHOTO_TYPES.includes(f.type)))
    return "Utilisez des images JPEG, PNG ou WebP (pas de PDF, HEIC ou SVG).";
  if (files.some((f) => f.size <= 0 || f.size > MAX_PHOTO_BYTES))
    return "Chaque photo doit peser au maximum 1 Mo.";
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_PHOTO_BYTES)
    return "Les photos doivent peser au maximum 2 Mo au total.";
}
