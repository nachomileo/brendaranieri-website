import type { Metadata } from "next";
import "./globals.css";
import { BackToTop } from "./components/back-to-top";
import { CookieConsent } from "./components/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://brendaranieri.art"),
  title: { default: "Brenda Ranieri | Artista visual y ceramista", template: "%s" },
  description: "Artista visual cuya práctica aborda la cerámica, la investigación material, el territorio y la transformación.",
  applicationName: "Brenda Ranieri",
  authors: [{ name: "Brenda Ranieri", url: "https://brendaranieri.art" }],
  creator: "Brenda Ranieri",
  keywords: ["Brenda Ranieri", "artista visual", "cerámica contemporánea", "investigación material", "arcillas locales", "arte contemporáneo", "Madrid"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
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
  twitter: { card: "summary_large_image", title: "Brenda Ranieri | Artista visual y ceramista", description: "Cerámica, investigación material, territorio y transformación.", images: ["/images/hero-la-forma-del-agua-quieta-final.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <BackToTop />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Person", "@id": "https://brendaranieri.art/#person", name: "Brenda Ranieri", jobTitle: "Artista visual y ceramista", description: "Artista visual cuya práctica investiga la cerámica, la materia, el territorio, el agua y los procesos colectivos.", url: "https://brendaranieri.art", image: "https://brendaranieri.art/images/hero-la-forma-del-agua-quieta-final.webp", sameAs: ["https://www.instagram.com/brendaranieri.studio/"], knowsAbout: ["Cerámica contemporánea", "Investigación material", "Arcillas locales", "Arte situado", "Prácticas colectivas"] }, { "@type": "WebSite", "@id": "https://brendaranieri.art/#website", url: "https://brendaranieri.art", name: "Brenda Ranieri", inLanguage: ["es", "en"], publisher: { "@id": "https://brendaranieri.art/#person" } }] }).replaceAll("<", "\\u003c") }} />
      </body>
    </html>
  );
}
