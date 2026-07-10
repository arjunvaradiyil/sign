import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Justice for Corro Health Employees",
  description:
    "Sign the petition demanding government intervention against the illegal mass retrenchment of 800 employees by Corro Health in Keralam.",
  openGraph: {
    title: "Justice for Corro Health Employees",
    description: "Stand With Keralam's Tech Workers. Sign the petition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full overflow-x-hidden font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
