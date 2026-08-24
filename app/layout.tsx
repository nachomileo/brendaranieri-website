import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brenda Ranieri — Artista visual",
  description: "Artista visual cuya práctica aborda la cerámica, la investigación material, el territorio y la transformación.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
