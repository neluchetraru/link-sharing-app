import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devlinks - Share your socials",
  description:
    "devlinks is a platform to share your social media profiles with a single link. Share your Instagram, Facebook, TikTok, GitHub, LinkedIn, and YouTube profiles with a single link.",

  // Open Graph
  openGraph: {
    title: "devlinks - Share your socials",
    description:
      "devlinks is a platform to share your social media profiles with a single link. Share your Instagram, Facebook, TikTok, GitHub, LinkedIn, and YouTube profiles with a single link.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "")}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
