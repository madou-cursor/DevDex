import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { brandingCssVars, brandingMetadata, getBranding } from "@/lib/branding";

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
  return (
    <html lang="en" style={brandingCssVars(b)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-dd-bg font-sans text-dd-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
