import { Link } from "@tanstack/react-router";
import { PRIMARY_NAV } from "@/lib/nav";

export function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-copper font-display text-sm text-paper">
            C
          </span>
          <span className="font-display text-lg tracking-tight">Crush</span>
          <span className="hidden text-sm text-muted sm:inline">Free Image Compressor</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center text-muted hover:text-ink"
              activeProps={{ className: "inline-flex min-h-11 items-center font-semibold text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
