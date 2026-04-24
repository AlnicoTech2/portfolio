import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya R — The Solo Engineering Studio",
  description:
    "Full-stack engineer shipping production mobile & web apps end-to-end. Flutter, React Native, Next.js, AI. 22+ apps shipped. Based in Bangalore.",
  keywords: ["app developer", "flutter developer", "react native", "next.js", "bangalore", "freelance", "full stack", "fractional cto", "ai engineer"],
  openGraph: {
    title: "Aditya R — The Solo Engineering Studio",
    description: "22+ production apps shipped. Full-stack engineer for founders. Flutter, React Native, Next.js, AI.",
    type: "website",
    url: "https://adityaravindranath.vercel.app",
    siteName: "Aditya R",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
