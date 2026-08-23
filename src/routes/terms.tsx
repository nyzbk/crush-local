import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl">Terms</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>
        <p className="mt-6 text-pretty">
          Crush is provided as-is, free of charge. Compression quality depends on your browser and device memory. We do
          not warrant that every file will encode, or that a smaller file is always produced (some already-optimized
          images can grow slightly).
        </p>
        <p className="mt-4 text-pretty text-muted">
          You are responsible for having the right to process the images you drop here. Do not use Crush to violate
          copyright or privacy of others.
        </p>
        <p className="mt-4 text-pretty text-muted">
          No watermark is added. No daily quota is enforced by us. The only limit is this device’s memory.
        </p>
        <p className="mt-4 text-pretty text-muted">
          Ads, when live, are served by Google AdSense under Google’s policies. Soft studio notes on this site are not
          advertisements.
        </p>
      </main>
    </AppShell>
  );
}
