from pathlib import Path
import json
from image_pipeline import assign_filenames, prepare_image

repo = Path(__file__).resolve().parents[1]
manifest_path = repo / "data/artwork-images.json"
manifest = json.loads(manifest_path.read_text())
source_folders = {
    "terra": "1",
    "vasija": "2",
    "vasija-2": "3",
    "black-collection": "4_family",
    "jarron": "5",
    "jarron-2": "6",
    "materia-solidificandose": "7_family",
    "vasija-3": "8",
    "antes-del-rayo": "9",
    "vasija-ladrillo": "10", "vasija-con-metal": "11", "vasija-con-piedras": "12",
    "cuenco-con-metal": "13", "vasija-con-piedras-2": "14", "vasija-arcilla-local": "15",
    "vasija-piedras-naturales": "16", "vasija-arcilla-local-2": "17", "sin-titulo-i": "18",
    "vasija-negra": "19", "piedras-de-diseno-propio": "20_family", "juego-de-candelabros": "21_family",
    "jarrita-y-cuncas": "22", "vasija-con-asas-i": "23", "vasija-con-asas-ii": "24",
    "vasija-i": "25", "vasija-ii": "26", "vasija-iii": "27", "figura": "28",
    "sin-titulo-ii": "29", "memorias-de-agua-y-barro": "30", "hypnos": "31", "caldero": "32",
    "senora-de-hierro": "33", "el-viajero": "34", "la-forma-del-agua-quieta-obra": "35",
    "vasija-con-asas-iii": "36",
    "lo-velado-obra": "37", "lo-atamos-con-alambre-obra": "38", "fuente-agua-quieta": "39",
}

preferred_covers = {
    "vasija-ladrillo": "OAX-CAR-38-57_Brenda Ranieri_15 Large.jpeg",
    "vasija-con-metal": "OAX-CAR-38-57_Brenda Ranieri_126.png",
    "vasija-con-piedras": "OAX-CAR-38-57_Brenda Ranieri_101.png",
    "cuenco-con-metal": "OAX-CAR-38-57_Brenda Ranieri_92.png",
    "vasija-con-piedras-2": "OAX-CAR-38-57_Brenda Ranieri_77.png",
    "vasija-arcilla-local": "OAX-CAR-38-57_Brenda Ranieri_65.png",
    "vasija-piedras-naturales": "OAX-CAR-38-57_Brenda Ranieri_72.png",
    "vasija-arcilla-local-2": "OAX-CAR-38-57_Brenda Ranieri_55.png",
    "sin-titulo-i": "OAX-CAR-38-57_Brenda Ranieri_1.png",
    "vasija-negra": "Jarrones_Anarqueologias_Brenda Ranieri_19.png",
    "piedras-de-diseno-propio": "Jarrones_Anarqueologias_Brenda Ranieri_14.png",
    "juego-de-candelabros": "Lo que queda_Brenda Ranieri.jpg",
    "jarrita-y-cuncas": "Jarrita y cuncas_ceramica_Brenda Ranieri_23.png",
    "vasija-con-asas-i": "Lo que queda_Brenda Ranieri_109.jpg",
    "vasija-con-asas-ii": "Lo que queda_Brenda Ranieri_23.jpg",
    "vasija-i": "P1210102.png", "vasija-ii": "P1210117.png", "vasija-iii": "P1210148.png",
    "figura": "P1210167.png", "sin-titulo-ii": "P1210044_gif.jpg",
    "memorias-de-agua-y-barro": "Memorias de agua y barro_Brenda Ranieri_Taller.jpg",
    "hypnos": "Hypnos_Brenda Ranieri.jpg", "caldero": "Caldero_Brenda Ranieri.jpg",
    "senora-de-hierro": "Señoras de hierro 18.jpg", "el-viajero": "El viajero - Ceramica -Brenda Ranieri.png",
    "la-forma-del-agua-quieta-obra": "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_3.png",
    "vasija-con-asas-iii": "P1210011.jpg",
    "lo-velado-obra": "08.webp", "lo-atamos-con-alambre-obra": "IMG_1736.jpeg",
    "fuente-agua-quieta": "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_53.png",
}

image_extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
for slug, folder in source_folders.items():
    actual_files = [path.name for path in (repo / "content/artworks" / folder).iterdir() if path.suffix.lower() in image_extensions]
    if slug == "vasija-2" and "Terra_Brenda Ranieri_2026_37_extended.png" in actual_files:
        actual_files.remove("Terra_Brenda Ranieri_2026_37.png")
    known_items = {item["source"]: item for item in manifest.get(slug, [])}
    files = [name for name in known_items if name in actual_files]
    files.extend(name for name in actual_files if name not in known_items)
    cover = preferred_covers.get(slug)
    if cover in files:
        files.remove(cover)
        files.insert(0, cover)
    manifest[slug] = [
        {**known_items.get(name, {}), "source": name, "alt": known_items.get(name, {}).get("alt", f"Obra {folder}, vista {index + 1}"), "width": known_items.get(name, {}).get("width", 0), "height": known_items.get(name, {}).get("height", 0)}
        for index, name in enumerate(files)
    ]
    assign_filenames(manifest[slug])

for slug, images in manifest.items():
    source_dir = repo / "content/artworks" / source_folders[slug]
    output_dir = repo / "public/images/artworks" / slug
    output_dir.mkdir(parents=True, exist_ok=True)
    for item in images:
        source = source_dir / item["source"]
        output = output_dir / item["file"]
        item["width"], item["height"] = prepare_image(source, output)
        print(f"{slug}/{output.name} <- {source.name}")

manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
