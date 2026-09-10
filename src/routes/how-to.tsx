import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-to")({
  component: HowTo,
  head: () =>
    pageHead(
      "How to compress images in the browser",
      "Step-by-step: quality slider, max size, JPEG vs WebP, iOS download, ZIP, and the mistakes that make photos look blocky.",
    ),
});

function HowTo() {
  return (
    <AppShell>
      <Article
        title="How to compress a photo with Crush"
        updated="Updated 6 September 2026"
        lede="Twelve practical steps, including the failures that look like \u201cthe tool is broken\u201d but are usually JPEG math, Safari downloads, or a photo that was already crushed by a messenger."
      >
        <h2>1. Open Crush on the device that holds the files</h2>
        <p>
          You do not create an account. You do not pick a cloud folder. The compressor only sees files you explicitly
          choose in this tab. If the photos live on a phone, open Crush in Safari on that phone rather than mailing
          originals to a laptop first \u2014 every extra hop is another chance for WhatsApp or Mail to re-encode them
          before you even start.
        </p>
        <h2>2. Drop or pick still images, not movies</h2>
        <p>
          JPEG, PNG, WebP, BMP, and the first frame of a GIF are accepted. A renamed PDF or an MP4 will be rejected by
          a magic-byte check, not \u201ccompressed\u201d into garbage. HEIC from iPhone Camera is a different codec; convert it
          elsewhere, then bring the JPEG here if you still need a smaller web file.
        </p>
        <h2>3. Decide the destination before you touch the slider</h2>
        <p>
          Email attachment and government forms almost always want JPEG under a megabyte cap. Product grids on a site
          that already serves WebP want WebP. App-store screenshots and UI with thin type want PNG or lossless-looking
          WebP, not JPEG. The slider cannot fix a wrong format. Read{" "}
          <Link to="/quality">JPG vs WebP</Link> if you are unsure.
        </p>
        <h2>4. Set quality in the 75\u201385 band for photographs</h2>
        <p>
          Start at 80. Encode. Look at a sky, a face, and any small text in the frame. If skies posterize or type
          grows mosquitoes, go up, not down. If the file is still huge, cap dimensions (next step) instead of dropping
          to 40 \u2014 that is how you get 8\u00d78 blocks you cannot undo. Do not crush a JPEG that Instagram already saved
          twice; go back to the camera original.
        </p>
        <h2>5. Cap width or height to the size you actually show</h2>
        <p>
          A 4000\u00d73000 phone still displayed at 800 CSS pixels is wasted entropy. Set max width to 1600 or 2048 for
          web, 1280 for slides, 800 for avatars. Crush fits inside the box and keeps aspect ratio. It will not upscale
          a small image. Empty fields mean keep native pixels, which is right for print masters you should not be
          putting through Crush anyway.
        </p>
        <h2>6. PNG: only when edges must stay bit-exact</h2>
        <p>
          Screenshots, diagrams, and logos belong on PNG. Camera photos saved as PNG are a trap: the file stays large
          because PNG is lossless. Switch those to JPEG or WebP. If a PNG grows a few hundred bytes after Crush, the
          original was already optimized; keep it.
        </p>
        <h2>7. Compress the batch and read the per-file row</h2>
        <p>
          Each file shows original size, new size, and a percent. A single failure (memory, bad type) should not kill
          the others. On a phone, do five photos at a time, not a full burst of forty 48-megapixel frames.
        </p>
        <h2>8. Download one file, or ZIP when you have several</h2>
        <p>
          The ZIP is built in the tab. It is not uploaded to a zip API. Name collisions get a suffix. If you only need
          one image, skip the archive.
        </p>
        <h2>9. iPhone: if nothing appears in Files, use Share</h2>
        <p>
          iOS Safari is picky about blob downloads. Crush offers a Share path so you can Save Image to Photos. If the
          image is sideways, the bitmap path should already have applied orientation; if it did not, rotate in Photos
          once and keep that export as the new original.
        </p>
        <h2>10. Do not loop Crush on the same JPEG</h2>
        <p>
          Every JPEG generation throws away more of the same 8\u00d78 coefficients. Two or three passes at 80 look fine.
          Ten passes look like a mosaic. Always return to the camera or RAW-derived master when you can.
        </p>
        <h2>11. When the output is larger than the input</h2>
        <p>
          That happens with already-optimized JPEG, tiny PNG icons, or when you pick PNG for a photograph. Keep the
          smaller original. Crush does not promise every file shrinks \u2014 some inputs are already at the bottom of the
          curve.
        </p>
        <h2>12. Close the tab when you are done</h2>
        <p>
          Bitmaps live in this tab\u2019s memory. There is no \u201crecent jobs\u201d on a server to recover. If you need the smaller
          file later, you must have downloaded it. Privacy is the point; it is also why we cannot resurrect a session.
        </p>
        <h2>Common mistakes</h2>
        <ul>
          <li>Dropping a WhatsApp export and wondering why it still looks soft \u2014 that file was already quantized.</li>
          <li>Using JPEG on a screenshot of a spreadsheet \u2014 numbers grow ringing; use PNG.</li>
          <li>Setting quality to 30 to \u201cmake it email-sized\u201d instead of resizing to 1280 px wide.</li>
          <li>Expecting animated GIF or 4K video to survive. They will not.</li>
        </ul>
        <p>
          Destination-specific guides:{" "}
          <Link to="/target">fit under a byte cap</Link>,{" "}
          <Link to="/whatsapp">WhatsApp and other chats</Link>,{" "}
          <Link to="/email">email and form caps</Link>,{" "}
          <Link to="/iphone">iPhone Safari downloads</Link>. Codec math stays on{" "}
          <Link to="/quality">JPEG vs WebP</Link>. Short version of privacy and formats:{" "}
          <Link to="/faq">FAQ</Link>.
        </p>
      </Article>
    </AppShell>
  );
}
