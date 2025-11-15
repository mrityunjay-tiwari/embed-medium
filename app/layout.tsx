import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

export const ubuntu = Ubuntu({
  variable: "--font-shadow",
  weight: ["300", "400", "500", "700"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Embed Medium Articles",
  description: "This is a Medium article embedder built with NextJS 16 and the medium-info-api package.",
  icons: {
    icon: "https://ik.imagekit.io/mrityunjay/1_psYl0y9DUzZWtHzFJLIvTw.png?updatedAt=1763234684952"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className}`}
      >
        {children}
      </body>
    </html>
  );
}
