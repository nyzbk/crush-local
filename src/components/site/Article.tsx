import type { ReactNode } from "react";

export function Article({
  title,
  lede,
  updated,
  children,
}: {
  title: string;
  lede?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl leading-tight">{title}</h1>
      {updated ? <p className="mt-2 text-sm text-muted">{updated}</p> : null}
      {lede ? <p className="mt-6 text-lg leading-relaxed text-pretty text-ink">{lede}</p> : null}
      <div className="article-body mt-6 space-y-4 leading-relaxed text-pretty text-muted [&_a]:text-copper-deep [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-ink [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
