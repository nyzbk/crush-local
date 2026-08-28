import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/quality")({
  component: Quality,
  head: () =>
    pageHead(
      "JPEG artifacts vs WebP — when each format wins",
      "Why JPEG grows 8×8 blocks, when WebP is smaller, and when Crush should output PNG instead of either lossy codec.",
    ),
});

function Quality() {
  return (
    <AppShell>
      <Article
        title="JPEG artifacts vs WebP — what Crush is actually changing"
        updated="Updated 28 August 2026"
        lede="Crush is a re-encoder, not a magician. The slider is a quality knob on JPEG or WebP. This page is the unique part of the tool: when those codecs start to lie."
      >
        <h2>What JPEG throws away</h2>
        <p>
          JPEG divides the image into 8×8 blocks, converts each block to frequencies, and discards the ones your eye is
          worse at noticing. At high quality that is invisible. At low quality you see the grid in gradients (sky,
          wall paint), “mosquito” noise around high-contrast type, and muddy skin. Chroma is often stored at half
          resolution (4:2:0), which is why saturated reds on a hard edge smear first. Once those coefficients are gone,
          raising the slider on a second pass cannot invent them. You need the original.
        </p>
        <h2>What WebP does differently</h2>
        <p>
          Lossy WebP (VP8 stills) spends bits more efficiently on edges and tends to beat JPEG at the same visual
          quality, especially on screenshots-with-a-photo and UI. That does not mean “always pick WebP.” Many printer
          portals, older Outlook builds, and bureaucratic uploaders still only accept JPEG or PNG. Serving WebP to a
          parser that does not understand it is a failed upload, not a smaller file. Crush can encode WebP when this
          browser supports it; if not, it falls back to JPEG so you are not stuck.
        </p>
        <h2>A practical rule for Crush’s slider</h2>
        <ul>
          <li>
            <strong>Photographs for web or email:</strong> JPEG or WebP at 75–85. Compare both on one hero image
            before batching.
          </li>
          <li>
            <strong>Product shots with type on the pack:</strong> stay at 85+ or use WebP; JPEG mosquitoes around
            letters faster than around skin.
          </li>
          <li>
            <strong>Screenshots, comics, UI:</strong> PNG. JPEG will ruin 1-pixel lines. WebP can work if the
            destination accepts it.
          </li>
          <li>
            <strong>Already tiny logos:</strong> do not run Crush. Canvas round-trip can add bytes.
          </li>
        </ul>
        <h2>Resize beats another click on the slider</h2>
        <p>
          A 12-megapixel JPEG at quality 90 is still huge because it is 12 megapixels. If the layout shows 720 pixels
          of width, encode at max width 1440 (2× for sharp phones) and quality 80. That almost always beats quality-40
          at full resolution, and it avoids the block grid. Crush’s max width / max height fields exist for this, not
          as an afterthought.
        </p>
        <h2>Generation loss</h2>
        <p>
          Save a JPEG, open it, save again, and you requantize the same blocks. Social apps do this without asking.
          Crush will do it too if you feed it an export instead of a camera original. Symptom: muddy midtones and
          block boundaries that do not match the scene. Fix: go back to the DNG/HEIC/full-size JPEG from the camera
          roll, not the Messenger copy.
        </p>
        <h2>What Crush does not claim</h2>
        <p>
          We do not run a perceptual model that picks quality for you. We do not promise a percent saved. We do not
          keep a sidecar of SSIM scores. You look at the preview sizes and the actual pixels. If the output is larger,
          keep the input. If it looks worse, raise quality or switch format — do not invent a third pass at 20.
        </p>
        <p>
          Walk through the clicks on <Link to="/how-to">How to</Link>, or start on the{" "}
          <Link to="/">compressor</Link>.
        </p>
      </Article>
    </AppShell>
  );
}
