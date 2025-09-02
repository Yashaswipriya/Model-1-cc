import type { Metadata } from "next";
import { Bricolage_Grotesque, Syne } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Modern Agency",
  description: "Design. Build. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${syne.variable}`}>
      <body className="font-sans">
        <SplashCursor />
        {children}
      </body>
    </html>
  );
}

