import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brendaranieri.art"),
  title: "Brenda Ranieri — Artista visual",
  description: "Artista visual cuya práctica aborda la cerámica, la investigación material, el territorio y la transformación.",
  icons: {
    icon: [{ url: "/brand/br-icon-v2.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/brand/br-apple-icon-v2.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Brenda Ranieri",
    title: "Brenda Ranieri — Artista visual",
    description: "Cerámica, investigación material, territorio y transformación.",
    images: ["/images/hero-la-forma-del-agua-quieta-final.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Brenda Ranieri", jobTitle: "Artista visual y ceramista", url: "https://brendaranieri.art", sameAs: ["https://www.instagram.com/brendaranieri.studio/"] }).replaceAll("<", "\\u003c") }} /></body>
    </html>
  );
}
