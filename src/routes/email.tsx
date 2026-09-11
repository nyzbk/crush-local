import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { emailFaq } from "@/content/faq";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/email")({
  component: EmailGuide,
  head: () =>
    articleHead({
      title: "Fit photos under Gmail and Outlook attachment caps",
      description:
        "Gmail send is still about 25 MB for the whole message. Resize and JPEG the stills here, then attach. Crush does not mint a Drive link.",
      path: "/email",
      appName: "Email photo size",
      faqs: emailFaq,
      howToName: "How to fit photos under a Gmail attachment cap",
      howToSteps: [
        "Add the sizes of every file on the draft. The cap is the letter, not one photo.",
        "Cap the long edge and encode JPEG around 75-85 on this page.",
        "Leave headroom for MIME. A 22 MB folder can fail as mail.",
        "Attach the new files. Crush does not send email and does not mint a Drive link.",
      ],
    }),
});

function EmailGuide() {
  return (
    <AppShell>
      <Article
        title="Get the photos through Gmail, Outlook and the 2 MB form"
        updated="Updated 6 September 2026"
        lede="Gmail's common send ceiling is still 25 MB for everything you attach. Go over it and Gmail swaps the files for a Drive link. Crush can make a still smaller. It cannot raise the cap and it cannot send the email."
      >
        <h2>What 25 MB actually measures</h2>
        <p>
          Google's help for sending attachments: if total attachment size is greater than 25 MB, Gmail adds a Drive link instead of keeping the bytes in the message. That is the sum of every file on the draft. MIME encoding inflates binaries by roughly a third. A 22 MB folder can fail as mail.
        </p>
        <p>
          Outlook and many Microsoft 365 tenants sit around 20-35 MB. Visa and school portals often say 2 MB or 10 MB per file and mean it.
        </p>
        <h2>A photo is not a PDF</h2>
        <p>
          Crush does not open PDF. A photograph of paper saved as JPEG belongs here. Face on a 2 MB form: max width 1200, JPEG 80. Do not JPEG a screenshot of a thread — that is <Link to="/quality">the quality page</Link>.
        </p>
        <h2>Six steps</h2>
        <h3>1. Weigh the draft</h3>
        <p>Add the sizes. Write the cap down. Smaller is not a setting.</p>
        <h3>2. Same device</h3>
        <p>Do not mail originals to yourself first. Tool: <Link to="/">homepage</Link>. Buttons: <Link to="/how-to">How to</Link>.</p>
        <h3>3. JPEG unless the form named another type</h3>
        <p>Embassy uploaders still reject WebP.</p>
        <h3>4. Cap the long edge, then 75-85</h3>
        <p>Resize beats quality 20 at full resolution.</p>
        <h3>5. Leave headroom for MIME</h3>
        <p>If four photos still sum to 30 MB, drop the long edge again or split across two messages.</p>
        <h3>6. Keep the camera original</h3>
        <p>Canvas drops GPS. Closing the tab stores nothing.</p>
        <h2>What will not help</h2>
        <ul>
          <li>Renaming .jpg to .zip.</li>
          <li>Attaching the ZIP plus the originals.</li>
          <li>Looping Crush on the same JPEG.</li>
          <li>Chat recode: <Link to="/whatsapp">WhatsApp guide</Link>.</li>
          <li>Safari blob: <Link to="/iphone">iPhone guide</Link>.</li>
        </ul>
        <p>
          Related: <Link to="/">Open the compressor</Link>
          {" · "}
          <Link to="/how-to">How to</Link>
          {" · "}
          <Link to="/use-cases">Use cases</Link>.
        </p>
      </Article>
      <FaqSection items={emailFaq} />
    </AppShell>
  );
}
