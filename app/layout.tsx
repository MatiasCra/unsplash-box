import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Favicon from "../assets/favicon.ico";
import "./globals.css";
import Navbar from "./components/Navbar";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: {
    default: "Unsplash Box",
    template: "%s | Unsplash Box",
  },
  description: "Browse and manage public collections of Unsplash photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get title from rect props

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href={Favicon.src} sizes="any" />
        <title>
          {typeof metadata.title === "string" ? metadata.title : "Unsplash Box"}
        </title>
      </head>
      <body className={`${beVietnamPro.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
