import { createFileRoute } from "@tanstack/react-router";
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Private · in your browser</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Free image compressor — no upload, no watermark
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-muted">
          Shrink JPG, PNG and WebP photos on this device. Batch convert, set quality, cap dimensions, download a ZIP.
          Files never leave the tab.
        </p>
        <div className="mt-8">
          <CompressorApp />
        </div>
      </main>
      <HowItWorks />
      <FaqSection />
      <SoftAgencyCta />
    </AppShell>
  );
}
