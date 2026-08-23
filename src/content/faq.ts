export const FAQ = [
  {
    q: "Does Crush upload my photos?",
    a: "No. Every image is compressed in this tab with the Canvas API. Nothing is sent to a server for processing. You can turn off Wi-Fi after the page loads and it still works.",
  },
  {
    q: "Do I need an account?",
    a: "No signup, no email wall, no login. Choose files, compress, download. That is the whole product.",
  },
  {
    q: "Is there a watermark?",
    a: "Never. Output files are yours. We do not stamp Crush onto the pixels.",
  },
  {
    q: "Which formats can I compress?",
    a: "Input: JPG, PNG, WebP, BMP, and GIF (first frame). Output: JPG, PNG, or WebP. If WebP is not supported on a given browser, Crush falls back to JPG.",
  },
  {
    q: "Will quality look worse?",
    a: "JPG and WebP use a quality slider (default 80%). Most photos look the same at 70–85% and drop 50–80% in file size. PNG is lossless: Crush re-encodes and strips metadata, which often still shrinks screenshots.",
  },
  {
    q: "Can I resize while compressing?",
    a: "Yes. Set a max width or max height. Aspect ratio is always kept. Leave the fields empty to keep original dimensions.",
  },
  {
    q: "Is there a daily limit?",
    a: "No product quota. The only limit is this device’s memory. Very large batches may fail on older phones — that is a browser RAM guard, not a paywall.",
  },
  {
    q: "Does batch ZIP stay private too?",
    a: "Yes. The ZIP is built in the browser with JSZip. Files never leave the tab.",
  },
  {
    q: "Does it work on iPhone?",
    a: "Yes. Crush is built for iOS Safari: blob downloads, EXIF orientation when the browser supports it, and a file-picker fallback if drag-and-drop is awkward.",
  },
  {
    q: "Who made Crush?",
    a: "Crush is a free tool from Ultimatum — a brand-marketing studio. See About for other private tools (HEIC converter, PDF toolkit, invoice PDF).",
  },
] as const;
