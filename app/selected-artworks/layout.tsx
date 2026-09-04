import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Piezas seleccionadas | Brenda Ranieri",
  description: "Piezas y familias de piezas de Brenda Ranieri: cerámica contemporánea, arcillas locales, metal, agua y materiales del paisaje.",
  alternates: { canonical: "/selected-artworks" },
};

export default function SelectedArtworksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
