import Link from "next/link";
import type { Branding } from "@/lib/branding";

export function Header({
  branding,
  verticalLabel,
}: {
  branding: Branding;
  verticalLabel: string;
}) {
  return (
    <header className="border-b border-dd-brand/10 bg-dd-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 no-underline hover:opacity-90">
          {branding.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- customer URLs from env
            <img
              src={branding.logoUrl}
              alt=""
              className="h-9 w-auto max-w-[160px] object-contain"
            />
          ) : (
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-hidden
            >
              DD
            </span>
          )}
          <div>
            <p className="text-base font-semibold tracking-tight text-dd-fg">
              {branding.siteTitle}
            </p>
            <p className="text-xs text-dd-muted">{verticalLabel}</p>
          </div>
        </Link>
        <p className="max-w-xs text-right text-xs text-dd-muted sm:max-w-sm">
          Static demo ·{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="text-dd-muted"
          >
            Vercel
          </a>
        </p>
      </div>
    </header>
  );
}
