import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntryById, getVerticalBundle } from "@/lib/data";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = getEntryById(id);
  if (!entry) notFound();

  const { strings } = getVerticalBundle();
  const hasImg = Boolean(entry.spriteUrl && entry.spriteUrl.length > 0);

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-dd-muted no-underline hover:text-dd-accent"
      >
        ← {strings.detailBack}
      </Link>

      <article className="mt-8 space-y-6 rounded-2xl border border-dd-brand/10 bg-dd-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="sm:w-48">
              {hasImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={entry.spriteUrl as string}
                  alt=""
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ) : (
                <div
                  className="flex aspect-square w-full items-center justify-center rounded-xl text-3xl font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, var(--color-brand), var(--color-accent))`,
                  }}
                  aria-hidden
                >
                  {entry.name
                    .split(/\s+/)
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)
                    .toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{entry.name}</h1>
              <div className="flex flex-wrap gap-2">
                {entry.types.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-dd-bg px-2.5 py-0.5 text-xs font-medium ring-1 ring-dd-brand/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-dd-muted sm:text-base">{entry.description}</p>
            </div>
          </div>

          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="text-sm font-semibold uppercase tracking-wide text-dd-muted">
              Details
            </h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {Object.entries(entry.stats).map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-lg border border-dd-brand/10 bg-dd-bg px-3 py-2"
                >
                  <dt className="text-xs font-medium text-dd-muted">{k}</dt>
                  <dd className="font-mono text-sm text-dd-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="text-xs text-dd-muted">
            Entry id: <code className="font-mono text-dd-fg">{entry.id}</code> · slug:{" "}
            <code className="font-mono text-dd-fg">{entry.slug}</code>
          </p>
      </article>
    </main>
  );
}
