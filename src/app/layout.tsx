import type { Metadata } from "next";
import { Sora, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CS Hub — Resources for Engineering Students",
  description:
    "A curated resource hub for CS/IT engineering students. Find the best free courses, DSA sheets, roadmaps, GitHub repos, and placement prep — all in one place.",
  keywords: ["DSA", "placement preparation", "coding resources", "computer science", "engineering students", "CodeChef"],
  openGraph: {
    title: "CS Hub — Resources for Engineering Students",
    description: "Curated learning resources for CS students. Stop searching WhatsApp groups.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(sora.variable, dmMono.variable, "font-sans bg-bg text-ink antialiased")}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}