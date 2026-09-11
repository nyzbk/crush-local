import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () =>
    pageHead(
      "Privacy — Crush",
      "Crush compresses images in the browser. Photos are not uploaded for processing. Hosting logs and AdSense cookies are explained here.",
      "/privacy",
    ),
});

function Privacy() {
  return (
    <AppShell>
      <Article title="Privacy" updated="Last updated: 28 August 2026">
        <h2>Summary</h2>
        <p>
          Crush compresses images in your browser with the Canvas API. Photos you select are not uploaded to our
          servers for conversion. There is no Crush account, no file locker, and no cloud job id. Closing the tab
          discards the bitmaps in that tab’s memory.
        </p>
        <h2>What we process</h2>
        <ul>
          <li>
            <strong>Files you select</strong> stay on this device. Decode and encode run locally. We cannot see the
            pixels.
          </li>
          <li>
            <strong>Technical logs:</strong> the host (Vercel) and CDN may log IP address, user-agent, referrer, and
            URL path for security and reliability. Those logs do not include image bytes.
          </li>
          <li>
            <strong>Advertising:</strong> Google AdSense (publisher ca-pub-7636435144500691) may set cookies and
            collect device/ad identifiers after the site is approved for ads. Ads are independent of image processing.
            See{" "}
            <a href="https://policies.google.com/privacy" rel="noopener noreferrer">
              Google Privacy
            </a>{" "}
            and{" "}
            <a href="https://adssettings.google.com/" rel="noopener noreferrer">
              ads settings
            </a>
            .
          </li>
        </ul>
        <h2>Metadata</h2>
        <p>
          Re-encoding through Canvas typically drops GPS, camera serial, and most EXIF. Treat that as a side effect,
          not a certified redaction. Do not rely on Crush as the only step if you must prove metadata is gone.
        </p>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not upload, store, sell, or train on your photos.</li>
          <li>We do not require an account.</li>
          <li>We do not add watermarks.</li>
          <li>We do not sell a list of “people who compressed images.”</li>
        </ul>
        <h2>Your choices</h2>
        <p>
          Do not select files you do not want this tab to read. Use browser controls to clear site data. Email{" "}
          <Link to="/contact">contact</Link> for a privacy question about the product, not for a copy of a file — we
          do not have one.
        </p>
      </Article>
    </AppShell>
  );
}
