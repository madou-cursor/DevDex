"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { NavGroup, NavItem } from "@/lib/nav";

const storageKey = (groupId: string) => `devdex.nav.${groupId}.open`;

function readStoredOpen(groupId: string, defaultOpen: boolean): boolean {
  if (typeof window === "undefined") return defaultOpen;
  try {
    const raw = window.localStorage.getItem(storageKey(groupId));
    if (raw === "0" || raw === "false") return false;
    if (raw === "1" || raw === "true") return true;
  } catch {
    /* ignore */
  }
  return defaultOpen;
}

function isItemActive(
  pathname: string,
  searchParams: URLSearchParams,
  hash: string,
  item: NavItem,
): boolean {
  if (item.id === "home") {
    return pathname === "/" && !searchParams.get("type") && hash !== "#catalog";
  }
  if (item.id === "catalog") {
    if (pathname.startsWith("/entry")) return true;
    if (hash === "#catalog") return true;
    if (pathname === "/" && searchParams.get("type")) return true;
    return false;
  }
  if (item.href.startsWith("/?type=")) {
    try {
      const u = new URL(item.href, "https://example.invalid");
      const want = u.searchParams.get("type");
      return pathname === "/" && Boolean(want) && searchParams.get("type") === want;
    } catch {
      return false;
    }
  }
  return false;
}

function navLinkClass(active: boolean) {
  return `flex items-center gap-2 rounded-lg px-3 py-2 text-sm no-underline transition-colors ${
    active
      ? "border-l-2 border-dd-accent bg-dd-accent/10 font-semibold text-dd-fg"
      : "border-l-2 border-transparent text-dd-fg/85 hover:bg-dd-bg"
  }`;
}

export function SidebarNav({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");
  const isPrimary = group.id === "primary";
  const panelId = useId();
  const defaultOpen = true;
  const [open, setOpen] = useState(defaultOpen);
  const hydrated = useRef(false);

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (isPrimary) return;
    if (hydrated.current) return;
    hydrated.current = true;
    setOpen(readStoredOpen(group.id, defaultOpen));
  }, [group.id, isPrimary, defaultOpen]);

  const persistOpen = useCallback(
    (next: boolean) => {
      if (isPrimary) return;
      setOpen(next);
      try {
        window.localStorage.setItem(storageKey(group.id), next ? "1" : "0");
      } catch {
        /* ignore */
      }
    },
    [group.id, isPrimary],
  );

  const renderItem = (item: NavItem) => {
    const active = isItemActive(pathname, searchParams, hash, item);
    return (
      <li key={item.id}>
        <Link
          href={item.href}
          onClick={() => onNavigate?.()}
          aria-current={active ? "page" : undefined}
          className={navLinkClass(active)}
        >
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {typeof item.count === "number" ? (
            <span className="shrink-0 text-xs tabular-nums text-dd-muted">{item.count}</span>
          ) : null}
        </Link>
      </li>
    );
  };

  if (isPrimary) {
    return (
      <nav aria-label="Main" className="px-2 pb-2 pt-1">
        <ul className="space-y-0.5">{group.items.map(renderItem)}</ul>
      </nav>
    );
  }

  return (
    <nav aria-label={group.label} className="px-2 pb-2">
      <div className="flex items-center justify-between px-2 pb-1 pt-2">
        <button
          type="button"
          className="flex flex-1 items-center gap-1 rounded-md py-1 text-left text-[10px] font-semibold uppercase tracking-wide text-dd-muted outline-none ring-dd-accent/30 hover:text-dd-fg focus-visible:ring-2"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => persistOpen(!open)}
        >
          <span className="flex-1">{group.label.toUpperCase()}</span>
          <span className="text-dd-muted" aria-hidden>
            {open ? "▾" : "▸"}
          </span>
        </button>
      </div>
      {open ? (
        <ul id={panelId} className="space-y-0.5">
          {group.items.map(renderItem)}
        </ul>
      ) : null}
    </nav>
  );
}
