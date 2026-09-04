import type { Metadata } from "next";
import AboutPage from "./about-page";

export const metadata: Metadata = {
  title: "About — Brenda Ranieri",
  description: "Práctica, trayectoria y statement de la artista visual y ceramista Brenda Ranieri.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
