import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { preparePhotos } from "../lib/photo-validation.ts";
import { photoSelectionError } from "../lib/photo-rules.ts";
test("enforces count, supported formats and total upload limits", () => {
  assert.ok(
    photoSelectionError(
      Array.from({ length: 4 }, () => ({ size: 20, type: "image/jpeg" })),
    ),
  );
  assert.ok(photoSelectionError([{ size: 20, type: "image/svg+xml" }]));
  assert.ok(photoSelectionError([{ size: 2_000_000, type: "image/jpeg" }]));
  assert.ok(
    photoSelectionError(
      Array.from({ length: 3 }, () => ({ size: 900_000, type: "image/jpeg" })),
    ),
  );
  assert.equal(
    photoSelectionError([{ size: 200, type: "image/webp" }]),
    undefined,
  );
});
test("rejects disguised or malformed image payloads", async () => {
  for (const photos of [
    [
      {
        name: "x.jpg",
        type: "image/jpeg",
        content: Buffer.from('<svg onload="alert(1)"/>').toString("base64"),
      },
    ],
    [{ name: "x.jpg", type: "image/jpeg", content: "%%%%" }],
    "invalid",
  ])
    await assert.rejects(() => preparePhotos(photos));
});
test("decodes and re-encodes photographs with safe filenames and stripped metadata", async () => {
  const src = await sharp({
    create: { width: 30, height: 20, channels: 3, background: "#aabbcc" },
  })
    .withMetadata()
    .png()
    .toBuffer();
  const output = await preparePhotos([
    {
      name: "../../unsafe.png",
      type: "image/png",
      content: src.toString("base64"),
    },
  ]);
  assert.equal(output[0].filename, "cuisine-photo-1.jpg");
  const meta = await sharp(Buffer.from(output[0].content, "base64")).metadata();
  assert.equal(meta.format, "jpeg");
  assert.equal(meta.exif, undefined);
  assert.equal(meta.width, 30);
});
test("rejects a declared type that does not match the actual file", async () => {
  const src = await sharp({
    create: { width: 2, height: 2, channels: 3, background: "#fff" },
  })
    .png()
    .toBuffer();
  await assert.rejects(() =>
    preparePhotos([
      {
        name: "photo.jpg",
        type: "image/jpeg",
        content: src.toString("base64"),
      },
    ]),
  );
});
