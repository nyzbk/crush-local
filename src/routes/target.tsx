import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { TargetApp } from "@/components/crush/TargetApp";
import { targetFaq } from "@/content/faq";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/target")({
  component: TargetPage,
  head: () =>
    articleHead({
      title: "Fit an image under 50 KB, 200 KB or 2 MB",
      description:
        "Set a byte cap. Crush retries JPEG quality then long-edge size in this tab until the file fits, or it stops after 14 encodes and says so.",
      path: "/target",
      appName: "Crush target size",
      faqs: targetFaq,
      includeApp: true,
      howToName: "How to fit an image under a byte cap",
      howToSteps: [
        "Drop JPG, PNG or WebP. HEIC is refused.",
        "Pick 50 KB, 200 KB, 1 MB or type a custom number.",
        "Fit. Quality drops first, then the long edge, max 14 encodes.",
        "If the row is still over, crop or change format. The encoder will not lie.",
      ],
    }),
});

function TargetPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Byte cap · in this tab</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Fit the file under a number of bytes</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          The homepage slider is for how the photo looks. This page is for forms, chats and banners that reject anything
          over N kilobytes. You pick the cap. Crush re-encodes with the same Canvas compressor already on this site —
          quality first, then a smaller long edge — and stops after fourteen tries.
        </p>
        <div className="mt-8">
          <TargetApp />
        </div>
      </main>
      <Article
        title="A byte cap is not a quality slider and it is not a Gmail MIME lecture"
        updated="Updated 10 September 2026"
        lede="Portals count the file on disk. Messengers recode after you send. Mail wraps attachments. Those three ceilings are different jobs. This page only does the first one."
      >
        <h2>What “under 200 KB” actually means</h2>
        <p>
          The number on a government upload, a job portal, or an ad network is almost always the size of the file after
          you press Save — the <code>blob.size</code> you see in the row. It is not the pixel count, not the quality
          percent, and not the size of the email that will later carry the file. If the field says 50 KB, a 51 KB JPEG
          fails even if it looks identical to a 49 KB one. This tool loops until that integer is low enough, or it
          admits it cannot get there.
        </p>
        <p>
          WhatsApp-safe on this page is the 200 KB and 1 MB presets — same route, not a second URL. That is a size you
          choose <em>before</em> the chat recodes the photo. Recode after send is a different story:{" "}
          <Link to="/whatsapp">the WhatsApp guide</Link>. Gmail’s 25 MB send cap plus MIME bloat is{" "}
          <Link to="/email">the email guide</Link>. Do not mix those sentences into this control.
        </p>
        <h2>How the loop works</h2>
        <p>
          Crush already has a single encoder: <code>createImageBitmap</code>, Canvas, <code>toBlob</code>. The homepage
          calls it once with your quality and optional max width. Here the same function is called in a ladder copied
          from the idea in browser-image-compression (MIT): start JPEG quality near 0.90, step down toward 0.36, then
          drop the long edge from 2560 toward 720. Fourteen encodes is the hard stop so a 48 MP PNG cannot melt the
          tab. There is no extra wasm, no oxipng, no second codec.
        </p>
        <ol>
          <li>Drop JPG, PNG or WebP. HEIC is refused on purpose — wrong codec.</li>
          <li>Pick 50 KB, 200 KB, 500 KB, 1 MB, 2 MB, 5 MB, 10 MB, 18 MB, or type a custom number.</li>
          <li>Prefer JPG unless the destination named WebP. PNG under 500 KB is switched to JPEG and the row says so.</li>
          <li>Read before bytes, after bytes, how many encodes, and whether the edge moved.</li>
          <li>If the row still says over cap: crop the subject or pick another format. Do not tap the button again hoping for magic.</li>
        </ol>
        <h2>50 KB portals and why PNG dies there</h2>
        <p>
          A camera JPEG at 12 megapixels is often 3–8 MB. Quality 80 at full size still misses a 50 KB field. The loop
          will shrink the long edge. Faces get soft. That is honest: 50 KB of a portrait is a thumbnail, not a print.
          A PNG screenshot of a form is worse. PNG is lossless. Canvas cannot “compress PNG” the way oxipng does with
          filters. Under 500 KB this page converts that PNG to JPEG and tells you. If you needed sharp UI chrome, a 50
          KB JPEG of a screenshot will look blocky — the portal asked for that trade, not Crush.
        </p>
        <h2>18 MB is not 25 MB of mail</h2>
        <p>
          The 18 MB preset is a file-on-disk budget for people who still have to attach several photos to one Gmail
          draft. Gmail’s documented send ceiling is about 25 MB for the whole message, and MIME encoding inflates
          binaries by roughly a third. This control does not implement MIME and does not open Drive. It only tries to
          make <em>this still</em> ≤ 18 MB (or whatever you typed). If four 8 MB originals must travel together, cap
          each one here, then read the email page for the draft math.
        </p>
        <h2>What a miss after 14 encodes means</h2>
        <p>
          A 48 megapixel phone PNG of a whiteboard, or a screenshot already saved as a huge PNG, can still sit above a
          50 KB cap after quality 0.36 and a 720 px edge. The encoder did not fail silently. The row keeps the smallest
          blob it made and says it is still over. Next levers this page will not pull: cutting the frame (a resizer),
          turning a photo into 16 colors, or running a PNG optimizer. Lying that the file is under the cap would break
          the portal anyway.
        </p>
        <h2>WebP vs JPEG on a cap</h2>
        <p>
          WebP often wins the same look at fewer bytes, so a 200 KB WebP can look better than a 200 KB JPEG. Many
          chats and almost every visa form still want <code>.jpg</code>. If the uploader lists extensions, obey the
          list. Compare one hero on <Link to="/quality">JPG vs WebP</Link> before you batch. This page will not rename
          a WebP to <code>.jpg</code> to trick a form.
        </p>
        <h2>What this page will not do</h2>
        <ul>
          <li>It will not decode HEIC/HEIF from iPhone Camera.</li>
          <li>It will not open PDF or compress a scan that is already a document.</li>
          <li>It will not raise WhatsApp’s own recode or Gmail’s 25 MB send rule.</li>
          <li>It will not guarantee a hit. Fourteen encodes and a miss is a finished answer.</li>
          <li>It will not upload the bytes. Closing the tab drops the bitmaps.</li>
        </ul>
        <p>
          For a look-first pass with a quality slider, use the{" "}
          <Link to="/">homepage compressor</Link>. Button-by-button UI: <Link to="/how-to">How to</Link>. Safari
          download quirks: <Link to="/iphone">iPhone</Link>.
        </p>
      </Article>
      <FaqSection items={targetFaq} />
      <SoftAgencyCta />
    </AppShell>
  );
}
