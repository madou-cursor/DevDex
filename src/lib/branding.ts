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

const DEFAULT_BRANDING = {
  bgColor: "#f7f7f4",
  primaryColor: "#26251e",
  accentColor: "#f54e00",
  surfaceColor: "#f2f1ed",
  textColor: "#26251e",
  mutedColor: "#5c5b55",
} as const;

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
    bgColor: process.env.NEXT_PUBLIC_BG_COLOR || DEFAULT_BRANDING.bgColor,
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || DEFAULT_BRANDING.primaryColor,
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || DEFAULT_BRANDING.accentColor,
    surfaceColor: process.env.NEXT_PUBLIC_SURFACE_COLOR || DEFAULT_BRANDING.surfaceColor,
    textColor: process.env.NEXT_PUBLIC_TEXT_COLOR || DEFAULT_BRANDING.textColor,
    mutedColor: process.env.NEXT_PUBLIC_MUTED_COLOR || DEFAULT_BRANDING.mutedColor,
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

/** Light-mode branding overrides; dark mode uses tokens from globals.css */
export function brandingStyleBlock(b: Branding): string {
  const hasCustom =
    b.bgColor !== DEFAULT_BRANDING.bgColor ||
    b.textColor !== DEFAULT_BRANDING.textColor ||
    b.accentColor !== DEFAULT_BRANDING.accentColor ||
    b.primaryColor !== DEFAULT_BRANDING.primaryColor ||
    b.surfaceColor !== DEFAULT_BRANDING.surfaceColor ||
    b.mutedColor !== DEFAULT_BRANDING.mutedColor;

  if (!hasCustom) return "";

  return `:root:not(.dark){--color-bg:${b.bgColor};--color-fg:${b.textColor};--color-accent:${b.accentColor};--color-brand:${b.primaryColor};--color-card:${b.surfaceColor};--color-muted:${b.mutedColor};}`;
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
