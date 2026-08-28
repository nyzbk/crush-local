const STEPS = [
  {
    t: "Choose photos on this device",
    d: "Drop files or use the picker. Crush reads them in the tab. JPG, PNG, WebP, BMP, and the first frame of a GIF are accepted. Nothing is posted to a conversion API.",
  },
  {
    t: "Pick the output and the quality band",
    d: "JPEG is the safe send-anywhere format. WebP is usually smaller at the same look. PNG is lossless for screenshots and hard edges. The quality slider only applies to JPEG and WebP.",
  },
  {
    t: "Optionally cap width or height",
    d: "A 4000-pixel phone photo does not need to stay 4000 pixels for a web card. Aspect ratio is kept. Empty fields mean “do not resize.”",
  },
  {
    t: "Compress in the browser",
    d: "Canvas encodes a new blob. Progress is per file. A type mismatch or a memory guard shows an error on that row instead of failing the whole batch.",
  },
  {
    t: "Download one file or a ZIP",
    d: "No watermark and no account. On iOS, use Share if the browser blocks a raw blob download. Closing the tab drops the bitmaps from memory.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="font-display text-2xl text-ink">How Crush compresses a photo</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted">
        The pipeline is local: decode with createImageBitmap, fit to your max size, encode with canvas.toBlob. That is
        why the tool still works after you turn the radio off.
      </p>
      <ol className="mt-6 space-y-4">
        {STEPS.map((step, i) => (
          <li key={step.t} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-medium text-ink">{step.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">{step.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
