import sharp from "sharp";
import {
  photoSelectionError,
  type PhotoPayload,
  MAX_PHOTO_BYTES,
} from "./photo-rules.ts";
/** Validate/decode/re-encode in memory; never trust extension or original metadata. No public storage. */
export async function preparePhotos(
  input: unknown,
): Promise<{ filename: string; content: string }[]> {
  if (input === undefined) return [];
  if (!Array.isArray(input) || input.length > 3)
    throw new Error("Ajoutez au maximum 3 photographies.");
  const decoded: { buffer: Buffer; type: string }[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object")
      throw new Error("Photographie invalide.");
    const p = item as PhotoPayload;
    if (
      typeof p.content !== "string" ||
      p.content.length > Math.ceil(MAX_PHOTO_BYTES / 3) * 4 ||
      !p.content.length ||
      p.content.length % 4 !== 0 ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(p.content)
    )
      throw new Error("Données de photographie invalides.");
    const buffer = Buffer.from(p.content, "base64");
    if (buffer.toString("base64") !== p.content)
      throw new Error("Photographie illisible.");
    decoded.push({ buffer, type: p.type });
  }
  const error = photoSelectionError(
    decoded.map((p) => ({ size: p.buffer.length, type: p.type })),
  );
  if (error) throw new Error(error);
  const output = [];
  for (const [i, p] of decoded.entries()) {
    try {
      const image = sharp(p.buffer, {
        limitInputPixels: 20_000_000,
        failOn: "warning",
      });
      const meta = await image.metadata();
      if (
        !["jpeg", "png", "webp"].includes(meta.format || "") ||
        `image/${meta.format}` !== p.type ||
        (meta.pages || 1) > 1
      )
        throw new Error("format");
      const clean = await image
        .rotate()
        .resize({
          width: 1600,
          height: 1600,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 82 })
        .toBuffer();
      output.push({
        filename: `cuisine-photo-${i + 1}.jpg`,
        content: clean.toString("base64"),
      });
    } catch {
      throw new Error(
        "Une photo est illisible, présente des dimensions trop importantes, est animée ou ne correspond pas au format annoncé. Choisissez une autre image.",
      );
    }
  }
  return output;
}
