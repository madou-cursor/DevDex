"use client";

import { useEffect, useRef } from "react";
import type { Branding } from "@/lib/branding";
import type { NavGroup } from "@/lib/nav";
import type { VerticalId } from "@/lib/types";
import { Sidebar } from "./Sidebar";

export function MobileNavDrawer({
  open,
  onClose,
  branding,
  verticalLabel,
  verticalId,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  branding: Branding;
  verticalLabel: string;
  verticalId: VerticalId;
  nav: NavGroup[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("a[href]");
      first?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 left-0 flex w-[min(100%,var(--sidebar-w))] max-w-[320px] flex-col border-r border-dd-brand/10 bg-dd-card shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="flex items-center justify-end border-b border-dd-brand/10 px-2 py-2">
          <button
            type="button"
            className="rounded-md px-3 py-2 text-sm font-medium text-dd-muted hover:bg-dd-bg hover:text-dd-fg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Sidebar
            branding={branding}
            verticalLabel={verticalLabel}
            verticalId={verticalId}
            nav={nav}
            onNavigate={onClose}
          />
        </div>
      </div>
    </div>
  );
}
