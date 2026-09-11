import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/use-cases")({
  component: UseCases,
  head: () =>
    pageHead(
      "When to compress photos locally",
      "Application forms, CMS uploads, WhatsApp lookbooks, and stripping GPS before a public post — without sending the original to a conversion site.",
      "/use-cases",
    ),
});

function UseCases() {
  return (
    <AppShell>
      <Article
        title="Use cases — when a local compressor is the right tool"
        updated="Updated 28 August 2026"
        lede="Crush is for still images that must get smaller without leaving the device. These are the jobs people actually run, not a generic “optimize your SEO images” speech."
      >
        <h2>A form that refuses anything over 2 MB</h2>
        <p>
          Visa portals, insurance claims, and school applications still enforce hard caps. A recent phone JPEG is often
          4–8 MB. Crush: cap the long edge at 2048, JPEG 80, download. If it is still over, 1600 and 75. Do this from
          the original in Files or Photos, not from a screenshot of the photo. Keep the original; the portal does not
          need EXIF anyway, and Canvas will drop it.
        </p>
        <h2>A CMS that times out on 9 MB product shots</h2>
        <p>
          Studio JPEGs straight off a tethered camera are enormous. Your product grid may only show 800 pixels. Resize
          to 1600–2000 on the long edge, then JPEG or WebP depending on what the stack serves. Crush will not replace
          a proper DAM, but it unblocks a merchandiser who is not about to install ImageMagick. Do not JPEG a
          transparent PNG cutout — you will get a matte.
        </p>
        <h2>Sending a lookbook through chat without a second crush</h2>
        <p>
          WhatsApp, iMessage, and Telegram re-encode images unless you send them as documents. If you pre-size to
          something the messenger will not feel the need to destroy (for example 1600 px JPEG 80) and send as a file
          where the app allows it, the recipient sees what you saw. If you drop a 12 MB original into the chat
          composer, the messenger will crush it for you, badly. Crush first, then attach.
        </p>
        <h2>Publishing a photo without a map pin</h2>
        <p>
          Camera phones embed GPS. Canvas re-encode as a side effect strips most EXIF, including location. That is not
          a dedicated redaction suite — it will not search pixels for badges or faces — but it is enough when the
          threat model is “the JPEG should not contain a coordinate.” Keep the original offline. If you need to keep
          IPTC captions, Crush is the wrong step; use a metadata editor.
        </p>
        <h2>Batch of screenshots for a bug report</h2>
        <p>
          PNG screenshots are often already small. Crush may only shave metadata. If a report tool caps total ZIP size,
          try PNG as-is first; if you must, WebP. Do not JPEG a screenshot of logs or a spreadsheet. The{" "}
          <Link to="/quality">quality page</Link> exists because this mistake is common.
        </p>
        <h2>When Crush is the wrong tool</h2>
        <ul>
          <li>HEIC from iPhone Camera — wrong codec.</li>
          <li>4K video, screen recordings, Live Photo motion.</li>
          <li>Print masters and color-managed campaigns.</li>
          <li>Animated meme GIFs you want to keep moving.</li>
        </ul>
        <p>
          Setup is on <Link to="/how-to">How to</Link>. Privacy specifics are on{" "}
          <Link to="/privacy">Privacy</Link>.
        </p>
      </Article>
    </AppShell>
  );
}
