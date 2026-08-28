import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    pageHead(
      "FAQ — uploads, quality, iOS, ZIP, EXIF",
      "Answers about Crush’s local Canvas pipeline: no upload, JPEG vs WebP, iPhone downloads, ZIP privacy, and metadata.",
    ),
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
