import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () =>
    pageHead(
      "Contact Crush",
      "Email the operator about Crush, the local image compressor. Include browser, device, and format — files are not stored on a server.",
      "/contact",
    ),
});

function Contact() {
  return (
    <AppShell>
      <Article title="Contact" lede="Crush is a small local-first tool. There is no ticket portal and no chatbot.">
        <p>
          Email{" "}
          <a href="mailto:ultaultimatum@gmail.com">ultaultimatum@gmail.com</a>
          . That inbox is watched by the operator (Ultimatum).
        </p>
        <h2>What to include</h2>
        <ul>
          <li>Browser and version (Safari iOS 18, Chrome 129, …)</li>
          <li>Device (phone / laptop) and roughly how many megapixels the photo is</li>
          <li>Input format (JPEG / PNG / WebP) and the output you chose</li>
          <li>Whether it failed at encode, download, or ZIP</li>
        </ul>
        <h2>What not to send</h2>
        <p>
          Do not attach private photos unless you accept that email is not a vault. Crush does not keep a server copy,
          so we cannot “look up job #4821.” If the tab is closed, the bitmaps are gone.
        </p>
        <p>
          Product how-to lives on this site: quality slider, JPEG vs WebP, iOS Share. Read those first if the question
          is “which setting.” Advertising on this site, when live, is Google AdSense — we cannot refund a click or
          change a creative from this inbox.
        </p>
      </Article>
    </AppShell>
  );
}
