import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {ThemeProvider}from "../components/Providers/theme-provider"
import { ConvexClientProvider } from "@/components/Providers/convex-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Potion",
  description: "Connected Workspace",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: light)",
        url:"/globe.svg",
        href:"/globe.svg",
      },
        {
        media:"(prefers-color-scheme: dark)",
        url:"/globe.svg",
        href:"/globe.svg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>
        <ConvexClientProvider>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="potion-theme-2"
        
        >
        {children}
        </ThemeProvider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}
