import Link from "next/link";
import type { DexEntry } from "@/lib/types";

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export function EntryCard({ entry }: { entry: DexEntry }) {
  const hasImg = Boolean(entry.spriteUrl && entry.spriteUrl.length > 0);

  return (
    <Link
      href={`/entry/${entry.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-dd-brand/10 bg-dd-card no-underline shadow-sm transition hover:border-dd-accent/40 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-dd-bg">
        {hasImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.spriteUrl as string}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-2xl font-bold text-white/95"
            style={{
              background: `linear-gradient(135deg, var(--color-brand), var(--color-accent))`,
            }}
            aria-hidden
          >
            {initials(entry.name)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-base font-semibold tracking-tight text-dd-fg group-hover:text-dd-accent">
          {entry.name}
        </h2>
        <p className="line-clamp-2 text-sm text-dd-muted">{entry.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {entry.types.map((t) => (
            <span
              key={t}
              className="rounded-full bg-dd-bg px-2 py-0.5 text-xs font-medium text-dd-fg ring-1 ring-dd-brand/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
