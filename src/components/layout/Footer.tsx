import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/AdUnit";
import { LEGAL_NAV, PRIMARY_NAV } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdUnit slot="footer" />
        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xs leading-relaxed">
            Crush compresses JPG, PNG and WebP in this browser. Files stay on the device. No watermark.
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Site">
            {[...PRIMARY_NAV, ...LEGAL_NAV].map((item) => (
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
