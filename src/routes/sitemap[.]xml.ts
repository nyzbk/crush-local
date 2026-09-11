import { createFileRoute } from "@tanstack/react-router";
import { CONTENT_LASTMOD, SITE_ORIGIN } from "@/lib/site";

const PATHS = [
  "/",
  "/how-to",
  "/target",
  "/whatsapp",
  "/email",
  "/iphone",
  "/quality",
  "/use-cases",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = SITE_ORIGIN;
        const lastmod = CONTENT_LASTMOD;
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PATHS.map(
          (path) => `  <url>\n    <loc>${origin}${path === "/" ? "/" : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`,
        ).join("\n")}\n</urlset>\n`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
