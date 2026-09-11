import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { FAQ } from "@/content/faq";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    articleHead({
      title: "FAQ — uploads, quality, iOS, ZIP, EXIF",
      description:
        "Answers about Crush local Canvas pipeline: no upload, JPEG vs WebP, iPhone downloads, ZIP privacy, and metadata.",
      path: "/faq",
      appName: "Crush FAQ",
      includeApp: false,
      faqs: FAQ,
    }),
});

function FaqPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl leading-tight">Crush FAQ</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-muted">
          Short questions, full answers. The same list is on the homepage so a crawler that only fetches “/” still sees
          them. Nothing here requires an account.
        </p>
        <div className="mt-8">
          <FaqSection hideHeading />
        </div>
      </main>
    </AppShell>
  );
}
