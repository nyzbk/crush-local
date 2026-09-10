import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { CompressorApp } from "@/components/crush/CompressorApp";
import { HowItWorks } from "@/components/site/HowItWorks";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { JsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <JsonLd />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Private \u00b7 in your browser</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Compress JPG, PNG and WebP in the browser \u2014 no upload
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          Crush shrinks photos on this device with the Canvas API. You set JPEG or WebP quality, optionally cap width or
          height, and download a single file or a ZIP. There is no conversion server, no account, and no watermark on
          the pixels.
        </p>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
          Most \u201cfree compressors\u201d send the original to a machine you do not control, then mail you a link. That is
          convenient until the photo is a passport scan, a client moodboard, or a kid\u2019s birthday. Crush never posts
          image bytes. After the page has loaded you can even turn the radio off and keep working.
        </p>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
          JPEG is still the format email and printers understand. WebP is usually smaller at the same look in current
          browsers. PNG is the right pick when edges must stay sharp.{" "}
          <Link to="/quality" className="text-copper-deep underline underline-offset-2">
            JPG vs WebP
          </Link>{" "}
          explains when 8\u00d78 JPEG blocks show up and when WebP is wasted because the site still rejects it.{" "}
          <Link to="/how-to" className="text-copper-deep underline underline-offset-2">
            How to compress
          </Link>{" "}
          walks the slider, iOS download, and batch ZIP.
        </p>
        <div className="mt-8">
          <CompressorApp />
        </div>
      </main>
      <HowItWorks />
      <section className="mx-auto max-w-3xl px-4 pb-6">
        <h2 className="font-display text-2xl text-ink">What Crush will and will not do</h2>
        <p className="mt-3 leading-relaxed text-pretty text-muted">
          Crush re-encodes still images. It is not a HEIC converter (iPhone Camera rolls need a different codec), not a
          video compressor, and not an animation optimizer \u2014 a GIF is flattened to its first frame. It is also not an
          archival master: Canvas output drops GPS, camera serial, and most ICC complexity. Keep the original if you
          need print color or captions.
        </p>
        <p className="mt-3 leading-relaxed text-pretty text-muted">
          The useful quality band for photographs is roughly 75\u201385 on the JPEG/WebP slider. Below ~60 you buy file size
          with blocky skies and ringing around type. Screenshots should stay PNG or go to WebP, not JPEG. Resizing a
          12-megapixel still down to the width you actually display often saves more bytes than chasing another five
          points of quality. Limits are this device\u2019s memory, not a daily quota we invented.
        </p>
        <p className="mt-3 leading-relaxed text-pretty text-muted">
          Browsers: current Chrome, Edge, Firefox, and Safari, including iOS. WebP encode is probed; if this engine
          cannot write WebP, Crush falls back to JPEG so you still leave with a file. Magic-byte checks reject random
          documents that were renamed to .jpg. If a row errors, the rest of the batch still runs.
        </p>
        <p className="mt-3 leading-relaxed text-pretty text-muted">
          People use Crush to fit photos into a 2 MB application form, to stop a CMS from timing out on a 9 MB phone
          JPEG, to send a lookbook over WhatsApp without the messenger crushing it a second time, and to strip location
          as a side effect of re-encoding before a public post.{" "}
          <Link to="/use-cases" className="text-copper-deep underline underline-offset-2">
            Use cases
          </Link>{" "}
          spells those out. If something breaks,{" "}
          <Link to="/contact" className="text-copper-deep underline underline-offset-2">
            contact
          </Link>{" "}
          has the operator email \u2014 there is no server copy of your files to \u201cretrieve.\u201d
        </p>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <Link to="/target" className="text-copper-deep underline underline-offset-2">
              Fit a file under 50 KB, 200 KB or 2 MB
            </Link>
          </li>
          <li>
            <Link to="/how-to" className="text-copper-deep underline underline-offset-2">
              Step-by-step how to
            </Link>
          </li>
          <li>
            <Link to="/quality" className="text-copper-deep underline underline-offset-2">
              JPEG artifacts vs WebP
            </Link>
          </li>
          <li>
            <Link to="/use-cases" className="text-copper-deep underline underline-offset-2">
              Real tasks people run
            </Link>
          </li>
          <li>
            <Link to="/faq" className="text-copper-deep underline underline-offset-2">
              Full FAQ
            </Link>
          </li>
          <li>
            <Link to="/whatsapp" className="text-copper-deep underline underline-offset-2">
              Stop WhatsApp from crushing the photo again
            </Link>
          </li>
          <li>
            <Link to="/email" className="text-copper-deep underline underline-offset-2">
              Fit photos under a 25 MB email cap
            </Link>
          </li>
          <li>
            <Link to="/iphone" className="text-copper-deep underline underline-offset-2">
              Save the result from Safari on iPhone
            </Link>
          </li>
        </ul>
      </section>
      <FaqSection />
      <SoftAgencyCta />
    </AppShell>
  );
}
