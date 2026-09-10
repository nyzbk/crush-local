import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/AdUnit";
import { EXTRA_FOOTER_NAV, LEGAL_NAV, PRIMARY_NAV } from "@/lib/nav";

const HUB = "https://ultimatum-hub.vercel.app/";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdUnit slot="footer" />
        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="leading-relaxed">
              Crush compresses JPG, PNG and WebP in this browser. Files stay on the device. No watermark.
            </p>
            <a
              href={HUB}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center font-semibold text-copper-deep underline-offset-4 hover:underline"
            >
              Ultimatum hub
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Site">
            {[...PRIMARY_NAV, ...EXTRA_FOOTER_NAV, ...LEGAL_NAV].map((item) => (
              <Link key={item.to} to={item.to} className="min-h-11 inline-flex items-center hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
