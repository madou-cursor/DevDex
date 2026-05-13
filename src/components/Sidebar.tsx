import Link from "next/link";
import { Suspense } from "react";
import type { Branding } from "@/lib/branding";
import type { NavGroup } from "@/lib/nav";
import type { VerticalId } from "@/lib/types";
import { SidebarNav } from "./SidebarNav";

export function Sidebar({
  branding,
  verticalLabel,
  verticalId,
  nav,
  onNavigate,
}: {
  branding: Branding;
  verticalLabel: string;
  verticalId: VerticalId;
  nav: NavGroup[];
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-dd-brand/10 px-5 py-5">
        <Link href="/" className="flex items-center gap-3 no-underline hover:opacity-90">
          {branding.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- customer URLs from env
            <img
              src={branding.logoUrl}
              alt=""
              className="h-9 w-auto max-w-[140px] object-contain"
            />
          ) : (
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-hidden
            >
              DD
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-base font-semibold tracking-tight text-dd-fg">{branding.siteTitle}</p>
            <p className="truncate text-xs text-dd-muted">{verticalLabel}</p>
          </div>
        </Link>
      </div>

      <div className="px-4 pb-3 pt-2">
        <div
          className="flex items-center gap-2 rounded-lg border border-dd-brand/15 bg-dd-bg px-3 py-2 text-sm text-dd-muted"
          aria-hidden
        >
          <span className="opacity-70">⌕</span>
          <span className="flex-1 truncate">Search the catalog…</span>
          <kbd className="hidden rounded border border-dd-brand/15 bg-dd-card px-1.5 py-0.5 font-mono text-[10px] text-dd-muted sm:inline">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {nav.map((group) => (
          <Suspense key={group.id} fallback={null}>
            <SidebarNav group={group} onNavigate={onNavigate} />
          </Suspense>
        ))}
      </div>

      <div className="mt-auto border-t border-dd-brand/10 px-4 py-4">
        <div className="flex items-center gap-2 rounded-lg border border-dd-brand/10 bg-dd-bg px-3 py-2 text-xs text-dd-fg">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
            aria-hidden
          />
          <span className="font-medium capitalize">{verticalId}</span>
          <span className="ml-auto text-dd-muted">build-time</span>
        </div>
        <div className="mt-3 flex items-center justify-between px-1 text-xs text-dd-muted">
          <span>Theme</span>
          <div
            className="relative h-[22px] w-[38px] rounded-full bg-dd-card ring-1 ring-dd-brand/15"
            aria-hidden
            title="Theme toggle (placeholder)"
          >
            <span className="absolute left-0.5 top-0.5 block h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
