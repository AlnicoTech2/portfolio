import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya R — Full-Stack App & Web Developer",
  description:
    "I build mobile apps and web products end-to-end. Flutter, React Native, Next.js. 22+ apps shipped. Based in Bangalore.",
  keywords: ["app developer", "flutter developer", "react native", "next.js", "bangalore", "freelance", "full stack"],
  openGraph: {
    title: "Aditya R — Full-Stack App & Web Developer",
    description: "22+ production apps shipped. Flutter, React Native, Next.js. Based in Bangalore.",
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
      <body className={`${syne.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
