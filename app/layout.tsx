import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github Issue Classifier",
  description: "GitHub Issue Classifier running on Databricks with GCP Compute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className='{inter.className} bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
