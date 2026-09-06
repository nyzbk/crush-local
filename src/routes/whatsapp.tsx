import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { whatsappFaq } from "@/content/faq";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/whatsapp")({
  component: WhatsAppGuide,
  head: () =>
    pageHead(
      "Stop WhatsApp from recompressing your photos",
      "Chats recode a photo you send as an image. Compress first on this device, cap the long edge, then attach as a document when the app allows. No upload.",
    ),
});

function WhatsAppGuide() {
  return (
    <AppShell>
      <Article
        title="Stop the chat app from crushing the photo a second time"
        updated="Updated 6 September 2026"
        lede="WhatsApp, iMessage and Telegram recode a photo send. Crush first, cap the long edge, then attach as a document when the pixels matter."
      >
        <h2>Why the lookbook dies in the composer</h2>
        <p>
          A phone JPEG is often 4-12 MB. The chat treats it as a photo to preview and makes its own JPEG. Dropping a WhatsApp export into Crush will not restore detail. Start from the camera original. Math lives on the <Link to="/quality">JPEG vs WebP page</Link>. This page is the send path.
        </p>
        <h2>Photo send versus document send</h2>
        <ul>
          <li><strong>Photo / gallery.</strong> Almost always recoded. Status is this path with a harder cap.</li>
          <li><strong>Document / file.</strong> Bytes stay closer to what Crush encoded. Use the paperclip document slot, not the camera-roll tile.</li>
        </ul>
        <p>HD on a photo send is less bad, not lossless. The test: did the recipient get a file they can Save?</p>
        <h2>Seven steps</h2>
        <h3>1. Camera original</h3>
        <p>Not Save image from an old bubble. Buttons are on <Link to="/how-to">How to</Link>.</p>
        <h3>2. Same device</h3>
        <p>Do not mail the original to a laptop first. Safari download quirks: <Link to="/iphone">iPhone guide</Link>.</p>
        <h3>3. Cap the long edge</h3>
        <p>1600 px for a photo send, 2048 px for a document send you will zoom. Crush will not upscale.</p>
        <h3>4. JPEG 75-85, not WebP</h3>
        <p>Chats still choke on WebP. Quality 40 at full resolution invents the block grid. If it is still huge after 1600, drop to 1280, not to 30.</p>
        <h3>5. One hero, then the batch</h3>
        <p>ZIP is built in the tab. Five 48MP stills at a time on a phone.</p>
        <h3>6. Attach as a document</h3>
        <p>WhatsApp: paperclip to Document. Telegram: send as file. iMessage: file picker.</p>
        <h3>7. Do not loop</h3>
        <p>Generation loss: <Link to="/quality">quality page</Link>.</p>
        <h2>What this page will not claim</h2>
        <ul>
          <li>Crush does not disable WhatsApp compression.</li>
          <li>Crush does not send the image.</li>
          <li>Crush does not convert HEIC. Convert the still first, then bring the JPEG here.</li>
          <li>A mail megabyte cap is <Link to="/email">the email guide</Link>.</li>
        </ul>
        <p>
          Related: <Link to="/">Open the compressor</Link>
          {" · "}
          <Link to="/how-to">How to</Link>
          {" · "}
          <Link to="/email">Email caps</Link>
          {" · "}
          <Link to="/faq">FAQ</Link>.
        </p>
      </Article>
      <FaqSection items={whatsappFaq} />
    </AppShell>
  );
}
