import type { Metadata } from "next";
import { Bricolage_Grotesque, Ubuntu } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Modern Agency",
  description: "Design. Build. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${ubuntu.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

