import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bricolage_Grotesque, Syne } from "next/font/google";
import SplashCursor from "@/components/SplashCursor";
import GlobalButtons from "@/components/GlobalButtons";

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
  title: "Web Design Agency | Creative Agency",
  description: "Design. Build. Grow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${syne.variable}`}>
      <body className={`${bricolage.className} bg-[#fdfaf6]`}>
        {/* SplashCursor visible only on desktop */}
        <div className="hidden sm:block">
          <SplashCursor />
        </div>
        <GlobalButtons />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
