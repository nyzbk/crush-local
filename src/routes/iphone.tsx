import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { iphoneFaq } from "@/content/faq";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/iphone")({
  component: IphoneGuide,
  head: () =>
    articleHead({
      title: "Save compressed photos from Safari on iPhone",
      description:
        "Safari often ignores a raw blob download. Share the result into Files or Photos. Crush does not decode HEIC.",
      path: "/iphone",
      appName: "iPhone Safari download",
      faqs: iphoneFaq,
      howToName: "How to save a Crush download on iPhone",
      howToSteps: [
        "Compress in Safari on this origin. The work stays in the tab.",
        "Tap the result Share control, not a blind Download that Safari may drop.",
        "Save Image to Photos or Save to Files, then check the new file size.",
        "Encode fewer 48MP stills at a time if the tab reloads.",
      ],
    }),
});

function IphoneGuide() {
  return (
    <AppShell>
      <Article
        title="Compress on iPhone without losing the download in Safari"
        updated="Updated 6 September 2026"
        lede="The encoder is the same Canvas pipeline as on a desktop. The part that breaks on iPhone is what iOS does with a blob URL when a site says download."
      >
        <h2>Why desktop instructions lie on a phone</h2>
        <p>
          Safari often opens the blob in a new tab and never puts a copy in Files. People screenshot that preview. The fix is the Share sheet, not a lower quality number. A 48MP burst can reload the tab. Five photos at a time.
        </p>
        <h2>What Crush can decode on iPhone</h2>
        <p>
          JPEG, PNG, WebP, BMP, first frame of a GIF. HEIC from Camera is a different codec. Convert that still somewhere else, then drop the JPEG here. After you have a JPEG: <Link to="/whatsapp">WhatsApp</Link> or <Link to="/email">email</Link>.
        </p>
        <h2>Eight steps</h2>
        <h3>1. Open Crush in Safari</h3>
        <p>Not an in-app messenger browser. Tool: <Link to="/">compressor</Link>.</p>
        <h3>2. Pick from Photos or Files</h3>
        <p>Live Photo gives the still. Burst: pick the frame in Photos first.</p>
        <h3>3. Cap width before a 48MP burst</h3>
        <p>1600 or 2048 if the destination is chat, a site, or mail.</p>
        <h3>4. JPEG 75-85 for photographs</h3>
        <p>Why: <Link to="/quality">JPEG vs WebP</Link>. WebP falls back to JPEG if this Safari cannot write it.</p>
        <h3>5. Short queue</h3>
        <p>Five stills, share, then the next five. No server job to resume.</p>
        <h3>6. If Files stays empty, use Share</h3>
        <p>Save Image to Photos or Save to Files. Check the new file size so you do not attach the original.</p>
        <h3>7. Sideways stills</h3>
        <p>Rotate once in Photos if needed. Do not guess with another Crush pass.</p>
        <h3>8. Close the tab when done</h3>
        <p>Bitmaps live in this tab. There is no account and no recovery link.</p>
        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Blank download: Share. Do not lower quality.</li>
          <li>Tab reload: memory. Fewer files.</li>
          <li>Soft output: chat export. See <Link to="/whatsapp">WhatsApp</Link>.</li>
          <li>Portal refuses 8 MB: <Link to="/email">email cap</Link>.</li>
        </ul>
        <p>
          Related: <Link to="/">Open the compressor</Link>
          {" · "}
          <Link to="/how-to">How to</Link>
          {" · "}
          <Link to="/faq">FAQ</Link>
          {" · "}
          <Link to="/contact">Contact</Link>.
        </p>
      </Article>
      <FaqSection items={iphoneFaq} />
    </AppShell>
  );
}
