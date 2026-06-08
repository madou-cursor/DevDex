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
    "BBVA España — Catálogo demo";
  const siteDescription =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Demo educativa de un catálogo de productos bancarios (datos ficticios).";
  return {
    siteTitle,
    siteDescription,
    // BBVA España (demo) palette — public brand cues, no trademarked assets.
    bgColor: process.env.NEXT_PUBLIC_BG_COLOR || "#ffffff",
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#004481",
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#1973b8",
    surfaceColor: process.env.NEXT_PUBLIC_SURFACE_COLOR || "#f3f6fb",
    textColor: process.env.NEXT_PUBLIC_TEXT_COLOR || "#121212",
    mutedColor: process.env.NEXT_PUBLIC_MUTED_COLOR || "#5b6470",
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

/**
 * Returns a short uppercase initials string derived from the brand title
 * (e.g. "BBVA España — Catálogo demo" → "BB"). Used by the default
 * logo placeholder when `NEXT_PUBLIC_LOGO_URL` is not set.
 */
export function brandInitials(title: string): string {
  const cleaned = title.replace(/[^\p{L}\p{N}\s]/gu, " ").trim();
  if (!cleaned) return "DX";
  const first = cleaned.split(/\s+/)[0] ?? "";
  if (first.length >= 2) {
    return first.slice(0, 2).toUpperCase();
  }
  return first.slice(0, 1).toUpperCase();
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
