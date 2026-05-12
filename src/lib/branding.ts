import type { Metadata } from "next";
import type { CSSProperties } from "react";

export interface Branding {
  siteTitle: string;
  siteDescription: string;
  bgColor: string;
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
  logoUrl: string | null;
}

export function getBranding(): Branding {
  const siteTitle =
    process.env.NEXT_PUBLIC_SITE_TITLE ||
    process.env.NEXT_PUBLIC_BRAND_NAME ||
    "DevDex Demo";
  const siteDescription =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "A configurable catalog demo — static data, Vercel-ready.";
  return {
    siteTitle,
    siteDescription,
    bgColor: process.env.NEXT_PUBLIC_BG_COLOR || "#f7f7f4",
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#26251e",
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#f54e00",
    surfaceColor: process.env.NEXT_PUBLIC_SURFACE_COLOR || "#f2f1ed",
    textColor: process.env.NEXT_PUBLIC_TEXT_COLOR || "#26251e",
    mutedColor: process.env.NEXT_PUBLIC_MUTED_COLOR || "#5c5b55",
    logoUrl: process.env.NEXT_PUBLIC_LOGO_URL?.trim() || null,
  };
}

export function brandingCssVars(b: Branding): CSSProperties {
  return {
    "--color-bg": b.bgColor,
    "--color-fg": b.textColor,
    "--color-accent": b.accentColor,
    "--color-brand": b.primaryColor,
    "--color-card": b.surfaceColor,
    "--color-muted": b.mutedColor,
  } as CSSProperties;
}

export function brandingMetadata(): Metadata {
  const b = getBranding();
  return {
    title: b.siteTitle,
    description: b.siteDescription,
    openGraph: {
      title: b.siteTitle,
      description: b.siteDescription,
    },
  };
}
