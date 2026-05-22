import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MSAHM Admissions Guide",
  description: "Prospective student question and answer app for the MSAHM Program"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
