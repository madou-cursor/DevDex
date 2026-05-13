import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";
import { brandingCssVars, brandingMetadata, getBranding } from "@/lib/branding";
import { getVerticalBundle } from "@/lib/data";
import { getNav } from "@/lib/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = brandingMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const b = getBranding();
  const bundle = getVerticalBundle();
  const nav = getNav(bundle.entries, bundle.strings.filterLabel);
  return (
    <html lang="en" style={brandingCssVars(b)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-dd-bg font-sans text-dd-fg antialiased`}
      >
        <AppShell
          branding={b}
          verticalLabel={bundle.strings.verticalLabel}
          verticalId={bundle.id}
          nav={nav}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
