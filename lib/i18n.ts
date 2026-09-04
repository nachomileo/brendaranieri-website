export type SiteLanguage = "es" | "en";

export function localizedHref(href: string, language: SiteLanguage) {
  if (language === "es" || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}lang=en`;
}

const artworkMaterialsEn: Record<string, string> = {
  "Pasta refractaria, ladrillo machacado y metal": "Refractory clay body, crushed brick and metal",
  "Arcillas locales, esmaltes de formulación propia, materiales del paisaje urbano y metal": "Local clays, self-formulated glazes, materials from the urban landscape and metal",
  "Arcillas locales, piedras naturales, porcelana, esmaltes de formulación propia y materiales del paisaje urbano": "Local clays, natural stones, porcelain, self-formulated glazes and materials from the urban landscape",
  "Pasta refractaria y esmaltes de formulación propia": "Refractory clay body and self-formulated glazes",
  "Porcelana y metal. Cocción a leña a 1300 °C": "Porcelain and metal. Wood-fired at 1300 °C",
  "Porcelana, arena y metal. Cocción a leña a 1300 °C": "Porcelain, sand and metal. Wood-fired at 1300 °C",
  "Arcilla Carabanchel, arcilla Segovia, metal y restos de esmalte": "Carabanchel clay, Segovia clay, metal and glaze remnants",
  "Pasta refractaria, metal y esmaltes de formulación propia": "Refractory clay body, metal and self-formulated glazes",
  "Porcelana y metal": "Porcelain and metal",
  "Arcilla Carabanchel": "Carabanchel clay",
  "Pasta refractaria, piedras naturales y metal": "Refractory clay body, natural stones and metal",
  "Pasta refractaria, porcelana, metal y piedras de diseño propio": "Refractory clay body, porcelain, metal and self-designed stones",
  "Porcelana, esmalte y metal": "Porcelain, glaze and metal",
  "Pasta refractaria y piedras naturales": "Refractory clay body and natural stones",
  "Arcillas locales y pizarra": "Local clays and slate",
  "Arcilla local y piedras naturales": "Local clay and natural stones",
  "Arcilla local y esmalte de formulación propia": "Local clay and self-formulated glaze",
  "Arcilla local y metal": "Local clay and metal",
  "Pasta refractaria, piedra natural y esmalte de formulación propia": "Refractory clay body, natural stone and self-formulated glaze",
  "Pasta refractaria, porcelana, arcilla local, piedras naturales y metal": "Refractory clay body, porcelain, local clay, natural stones and metal",
  "Arcilla local": "Local clay",
  "Pasta refractaria, metal y esmalte de formulación propia": "Refractory clay body, metal and self-formulated glaze",
  "Técnica mixta": "Mixed media",
  "Cerámica y esmalte": "Ceramics and glaze",
  "Cerámica esmaltada": "Glazed ceramics",
  "Arcillas locales recolectadas, piedras naturales, esmalte e instalación hidráulica": "Gathered local clays, natural stones, glaze and water system",
  "Arcilla local y esmalte": "Local clay and glaze",
  "Pasta refractaria, esmaltes de formulación propia, metal e instalación hidráulica": "Refractory clay body, self-formulated glazes, metal and water system",
  "Cerámica, hormigón, plástico reciclado, diferentes tipos de metal e instalación hidráulica": "Ceramics, concrete, recycled plastic, various metals and water system",
  "Arcilla local recolectada, piedras naturales y esmalte": "Gathered local clay, natural stones and glaze",
};

export function artworkMaterial(value: string, language: SiteLanguage) {
  return language === "en" ? artworkMaterialsEn[value] ?? value : value;
}

export function artworkDimensions(value: string, language: SiteLanguage) {
  if (language === "es") return value;
  return value.replace("Dimensiones variables", "Variable dimensions").replace(" cm de alto × ", " cm high × ").replace(" cm de diámetro", " cm diameter");
}

export function artworkEdition(value: string | undefined, kind: "single" | "family" | undefined, language: SiteLanguage) {
  if (kind === "family") return language === "es" ? "Familia de piezas únicas" : "Family of unique works";
  if (language === "es") return value;
  return ({ "Pieza única": "Unique work", "Piezas únicas": "Unique works", "Conjunto de piezas únicas": "Group of unique works" } as Record<string, string>)[value ?? ""] ?? value;
}

export function projectFactLabel(label: string, language: SiteLanguage) {
  if (language === "es") return label;
  return ({ "Período": "Period", "Lugar": "Location", "Tipo": "Type", "Institución": "Institution", "Comisariado": "Curated by", "Materiales": "Materials", "Técnicas": "Techniques", "Dimensiones": "Dimensions" } as Record<string, string>)[label] ?? label;
}

const projectFactReplacements: Array<[string, string]> = [
  ["exposición individual", "solo exhibition"], ["exposición colectiva", "group exhibition"],
  ["exposición cerámica", "ceramics exhibition"],
  ["instalación escultórica", "sculptural installation"], ["instalación hidráulica", "water installation"],
  ["investigación material", "material research"], ["investigación", "research"],
  ["intervención cerámica", "ceramic intervention"], ["intervención en paisaje", "landscape intervention"],
  ["ruta expositiva", "exhibition route"], ["proyecto expositivo", "exhibition project"],
  ["cena inmersiva", "immersive dinner"], ["cena performativa", "performative dinner"],
  ["archivo material", "material archive"], ["práctica cerámica experimental", "experimental ceramic practice"],
  ["cerámica contemporánea", "contemporary ceramics"], ["cerámica", "ceramics"],
  ["arcillas locales", "local clays"], ["arcilla local", "local clay"], ["arcillas silvestres", "wild clays"], ["arcilla silvestre", "wild clay"],
  ["arcillas recolectadas", "gathered clays"], ["materiales naturales recolectados", "gathered natural materials"],
  ["pastas cerámicas propias", "self-formulated ceramic bodies"], ["pastas cerámicas", "ceramic bodies"], ["pastas refractarias", "refractory clay bodies"],
  ["esmaltes de formulación propia", "self-formulated glazes"], ["esmaltes experimentales", "experimental glazes"], ["esmaltes de ceniza", "ash glazes"], ["esmaltes", "glazes"],
  ["metal reciclado", "recycled metal"], ["metales reciclados", "recycled metals"], ["distintos metales", "various metals"], ["piedras naturales", "natural stones"],
  ["restos urbanos", "urban remnants"], ["residuos de estudios participantes", "waste from participating studios"], ["residuos de café", "coffee waste"],
  ["restos de esmalte", "glaze remnants"], ["materiales de investigación del estudio", "studio research materials"], ["materiales naturales", "natural materials"],
  ["elementos de taller", "studio materials"], ["alimentos vegetales", "plant-based food"], ["elementos naturales", "natural elements"], ["cristal", "glass"], ["piedra", "stone"], ["metal", "metal"],
  ["fotografía analógica", "analogue photography"], ["técnica mixta", "mixed media"],
  ["cocción de alta temperatura", "high-temperature firing"], ["cocción experimental", "experimental firing"], ["cocción", "firing"],
  ["construcción cerámica", "ceramic construction"], ["modelado cerámico", "ceramic modelling"], ["modelado", "modelling"],
  ["formulación de pastas y esmaltes", "ceramic-body and glaze formulation"], ["formulación y pruebas lineales de esmaltes", "glaze formulation and line testing"], ["formulación de esmaltes", "glaze formulation"], ["formulación de mezclas", "mixture formulation"],
  ["pruebas de material", "material testing"], ["mezcla de pastas", "clay-body mixing"], ["ensamblaje", "assembly"],
  ["deriva territorial", "territorial drift"], ["puesta en escena", "staging"], ["diseño de experiencia", "experience design"],
  ["observación y registro", "observation and documentation"], ["instalación en paisaje", "landscape installation"],
  ["reconstrucción de piezas", "reconstruction of works"], ["incrustación de metales", "metal inlay"], ["engobe coloidal", "colloidal slip"], ["torno", "wheel throwing"],
  ["monotipo", "monotype"], ["serigrafía", "screen printing"], ["experimentación cerámica", "ceramic experimentation"], ["diseño de experiencia", "experience design"],
  ["coloquio", "discussion"], ["mediación", "mediation"], ["recolección", "gathering"], ["secado", "drying"],
  ["pintura", "painting"], ["teñido", "dyeing"], ["óleo", "oil"], ["papel", "paper"], ["tinta", "ink"], ["porcelana", "porcelain"], ["hormigón", "concrete"], ["agua", "water"], ["madera", "wood"],
  ["instalación", "installation"], ["colaboración", "collaboration"], ["festival", "festival"], ["residencia", "residency"], ["open studio", "open studio"], ["taller", "workshop"],
  ["dimensiones variables", "variable dimensions"], ["conjunto variable", "variable group"], ["instalación variable", "variable installation"], ["no aplica", "not applicable"],
  ["enero", "January"], ["febrero", "February"], ["marzo", "March"], ["abril", "April"], ["mayo", "May"], ["junio", "June"], ["julio", "July"], ["agosto", "August"], ["septiembre", "September"], ["octubre", "October"], ["noviembre", "November"], ["diciembre", "December"], ["finales de", "late"],
  ["de alto", "high"], ["de diámetro", "diameter"], ["piezas documentadas", "documented works"], ["cuatro piezas", "four works"],
  ["antiguo enclave portuario", "former port site"], ["bosque de hayas", "beech forest"], ["pintura", "painting"], ["mural", "mural"], ["escultura", "sculpture"],
];

export function projectFactValue(value: string, language: SiteLanguage) {
  if (language === "es") return value;
  return [...projectFactReplacements]
    .sort(([a], [b]) => b.length - a.length)
    .reduce((translated, [source, target]) => translated.replace(new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), target), value)
    .replace(/(\d) de (January|February|March|April|May|June|July|August|September|October|November|December)/g, "$1 $2")
    .replace(/(January|February|March|April|May|June|July|August|September|October|November|December) de (\d)/g, "$1 $2")
    .replace(/ y /gi, " and ");
}
