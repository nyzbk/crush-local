import { FAQ } from "@/content/faq";

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Crush` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Crush` },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://crush-local.vercel.app/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function JsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Crush",
    url: "https://crush-local.vercel.app",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Compress JPG, PNG and WebP images in the browser with Canvas. No upload, no signup, no watermark.",
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Crush",
    url: "https://crush-local.vercel.app/",
    inLanguage: "en",
  };
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ultimatum",
    email: "ultaultimatum@gmail.com",
    url: "https://crush-local.vercel.app/about",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
