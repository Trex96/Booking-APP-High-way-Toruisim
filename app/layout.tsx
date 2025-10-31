import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Highway Delite - Book Your Adventure",
  description: "Book curated small-group experiences with certified guides",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
