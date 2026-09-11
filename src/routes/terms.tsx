import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () =>
    pageHead(
      "Terms — Crush",
      "Crush is a free as-is image compressor. Quality depends on your browser. You must have the right to process the files you drop.",
      "/terms",
    ),
});

function Terms() {
  return (
    <AppShell>
      <Article title="Terms" updated="Last updated: 28 August 2026">
        <p>
          Crush is provided free of charge, as-is. Compression quality, output size, and whether a given file encodes
          at all depend on your browser, device memory, and the input. We do not warrant that every file shrinks. Some
          already-optimized images grow slightly after a Canvas round-trip.
        </p>
        <p>
          You are responsible for having the right to process the images you drop here. Do not use Crush to violate
          copyright, privacy, or other law. Do not upload others’ private photos to a chat after compressing them if
          you lacked the right to have them in the first place — Crush does not grant that right.
        </p>
        <p>
          No watermark is added. No daily quota is enforced by us. The only operational limit is this device’s memory
          and the type guard (still images, not video).
        </p>
        <p>
          Ads, when live, are served by Google AdSense under Google’s policies. Placeholder slots on the page before
          approval are not clickable ads. Soft studio notes are not advertisements. Do not click ads on your own site
          to “test” them.
        </p>
        <p>
          Output files are yours to keep. We do not retain a server copy, so we cannot restore a session. See{" "}
          <Link to="/privacy">Privacy</Link> and <Link to="/contact">Contact</Link>.
        </p>
      </Article>
    </AppShell>
  );
}
