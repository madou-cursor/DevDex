import type { Branding } from "@/lib/branding";

export function TopBar({
  branding,
  verticalLabel,
  onOpenMenu,
}: {
  branding: Branding;
  verticalLabel: string;
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-dd-brand/10 bg-dd-card/90 backdrop-blur-sm lg:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-dd-brand/15 bg-dd-bg text-dd-fg outline-none ring-dd-accent/30 hover:bg-dd-card focus-visible:ring-2"
          aria-label="Open navigation menu"
          onClick={onOpenMenu}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-dd-fg">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {branding.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={branding.logoUrl} alt="" className="h-8 w-auto max-w-[120px] object-contain" />
          ) : (
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-hidden
            >
              DD
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-dd-fg">{branding.siteTitle}</p>
            <p className="truncate text-xs text-dd-muted">{verticalLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
