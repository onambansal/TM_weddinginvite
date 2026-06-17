import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mansi & Tanuj — Wedding Invitation | 5th December 2026",
  description:
    "You are cordially invited to the wedding of Mansi Gupta and Tanuj Goyal on 5th December 2026. Two hearts, one beautiful journey.",
  keywords: ["wedding", "invitation", "Mansi Gupta", "Tanuj Goyal", "December 2026"],
  openGraph: {
    title: "Mansi & Tanuj — Wedding Invitation",
    description: "Join us to celebrate our wedding on 5th December 2026",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mansi & Tanuj Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mansi & Tanuj — Wedding Invitation",
    description: "Join us to celebrate our wedding on 5th December 2026",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-cream font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}
