import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: About,
  head: () =>
    pageHead(
      "About Crush",
      "Crush is a local-first JPG/PNG/WebP compressor: Canvas in the browser, no upload, no watermark. Built by Ultimatum.",
    ),
});

function About() {
  return (
    <AppShell>
      <Article
        title="About Crush"
        updated="Updated 28 August 2026"
        lede="Crush exists because a photo compressor that uploads the original is the wrong default for anything you would not paste into a random form."
      >
        <h2>What this product is</h2>
        <p>
          Crush is a free web page that re-encodes still images in your browser. You choose JPEG, PNG, or WebP, set a
          quality for the lossy formats, optionally cap width or height, and download the result or a ZIP. The
          pipeline is createImageBitmap plus Canvas plus toBlob. That is the whole machine. There is no queue on a
          GPU box, no “processing…” spinner that means someone else’s disk, and no watermark.
        </p>
        <p>
          The design problem we actually care about is JPEG math vs WebP vs PNG — when 8×8 blocks appear, when a CMS
          still rejects .webp, when a screenshot must not become a JPEG. That is documented on{" "}
          <Link to="/quality">JPG vs WebP</Link> rather than hidden in a tooltip.
        </p>
        <h2>What we deliberately do not do</h2>
        <p>
          We do not convert HEIC (wrong codec). We do not transcode video. We do not keep animation. We do not store
          jobs. We do not train models on your pixels. We do not require an email to download. Ads, when the site is
          approved, are Google AdSense placeholders until then — they are not mixed into the download button.
        </p>
        <h2>Who makes it</h2>
        <p>
          Ultimatum is a brand-marketing studio. Crush is one local-first utility in a family of tools that keep files
          on the device (invoice PDFs, HEIC conversion, PDF toolkit). Other tools are mentioned once so you can find
          them; this site is only the compressor. Studio work — identity, sites — is separate from this free page.
        </p>
        <p>
          Questions: <Link to="/contact">contact</Link>. How the slider works: <Link to="/how-to">how to</Link>. Legal:{" "}
          <Link to="/privacy">privacy</Link> and <Link to="/terms">terms</Link>.
        </p>
      </Article>
    </AppShell>
  );
}
