"use client";

import { type ReactNode, useState } from "react";
import type { Branding } from "@/lib/branding";
import type { NavGroup } from "@/lib/nav";
import type { VerticalId } from "@/lib/types";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({
  children,
  branding,
  verticalLabel,
  verticalId,
  nav,
}: {
  children: ReactNode;
  branding: Branding;
  verticalLabel: string;
  verticalId: VerticalId;
  nav: NavGroup[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="grid min-h-dvh w-full lg:grid-cols-[var(--sidebar-w)_1fr]">
        <aside className="hidden h-dvh flex-col border-r border-dd-brand/10 bg-dd-card lg:flex">
          <Sidebar
            branding={branding}
            verticalLabel={verticalLabel}
            verticalId={verticalId}
            nav={nav}
          />
        </aside>
        <div className="flex min-h-dvh min-w-0 flex-col">
          <TopBar
            branding={branding}
            verticalLabel={verticalLabel}
            onOpenMenu={() => setMobileOpen(true)}
          />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-dd-brand/10 bg-dd-card py-4 text-center text-xs text-dd-muted">
            <p>
              DevDex demo · fixtures only · vertical:{" "}
              <code className="rounded bg-dd-bg px-1 py-0.5 font-mono text-dd-fg">{verticalId}</code>
            </p>
          </footer>
        </div>
      </div>
      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        branding={branding}
        verticalLabel={verticalLabel}
        verticalId={verticalId}
        nav={nav}
      />
    </>
  );
}
