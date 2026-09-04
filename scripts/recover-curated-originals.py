"""Recover the exact locally archived originals named in BASE textos.md.

This is intentionally explicit: identically named legacy files such as
03.webp and 06.webp are only meaningful inside their project directory.
"""

from pathlib import Path
import json
import shutil

from image_pipeline import prepare_image, web_filename


REPO = Path(__file__).resolve().parents[1]
OLD = Path("/Users/brendaranieri/projects/_____brenda-web")
DESKTOP = Path("/Users/brendaranieri/Desktop")
MANIFEST_PATH = REPO / "data/project-images.json"


ASSETS = [
    # slug, source, destination source name, alt text, home selection
    ("bioceramica-a-base-de-residuos-de-cafe", DESKTOP / "BIOCERÁMICA/Brenda Ranieri_fotos Escala/Brenda3.jpg", "Brenda3.jpg", "Brenda Ranieri observando las pruebas de biocerámica durante la residencia", True),
    ("bioceramica-a-base-de-residuos-de-cafe", DESKTOP / "BIOCERÁMICA/Brenda Ranieri_fotos Escala/Brenda6.jpg", "Brenda6.jpg", "Vista de la investigación con residuos de café y arcillas silvestres", False),
    ("bioceramica-a-base-de-residuos-de-cafe", DESKTOP / "BIOCERÁMICA/Brenda Ranieri_fotos Escala/Brenda13.jpg", "Brenda13.jpg", "Archivo mural de formulaciones y resultados de biocerámica", True),
    ("bioceramica-a-base-de-residuos-de-cafe", OLD / "public/images/projects/bioceramica-a-base-de-residuos-de-cafe/01.webp", "01.webp", "Pruebas sólidas de biocerámica sin cocer elaboradas con café y arcilla", True),
    ("el-botijo-revisitado", DESKTOP / "PIEZAS/Botijos_Matadero Madrid_Brenda Ranieri_2.png", "Botijos_Matadero Madrid_Brenda Ranieri_2.png", "Materia solidificándose, límite ablandándose instalada en Matadero Madrid", True),
    ("ohm-2025-anarqueologias", OLD / "content/projects/ohm-2025-anarqueologias/Open studio_BR_OHM_69.jpg", "Open studio_BR_OHM_69.jpg", "Vista vertical de Anarqueologías durante Open House Madrid", False),
    ("certezas", DESKTOP / "EXPOSICIONES/2024_EXPO CERTEZAS - EL IMPARCIAL/Fotos_Inauguración Certezas_El Imparcial_BR/Brenda Ranieri_Certezas_Expo El Imparcial39.png", "Brenda Ranieri_Certezas_Expo El Imparcial39.png", "Vista de la exposición Certezas en El Imparcial", False),
    ("la-forma-del-agua-quieta", OLD / "public/images/projects/la-forma-del-agua-quieta/05.webp", "05.webp", "Fuente cerámica activada por el agua entre los árboles del patio", False),
    ("todo-lo-profundo-ama-el-disfraz", OLD / "public/images/projects/todo-lo-profundo-ama-el-disfraz/06.webp", "06.webp", "Vista de sala de Todo lo profundo ama el disfraz", False),
    ("cosas-que-cargan-cosas", OLD / "public/images/projects/cosas-que-cargan-cosas/05.webp", "05.webp", "Detalle vertical de las piezas en Cosas que cargan cosas", True),
    ("cosas-que-cargan-cosas", OLD / "public/images/projects/cosas-que-cargan-cosas/01.webp", "01.webp", "Vista de la instalación Lo atamos con alambre", True),
    ("cosas-que-cargan-cosas", OLD / "public/images/projects/cosas-que-cargan-cosas/04.webp", "04.webp", "Vista general de Cosas que cargan cosas", True),
    ("el-botijo-revisitado", OLD / "public/images/projects/el-botijo-revisitado/02.webp", "02.webp", "Pieza completa de Materia solidificándose, límite ablandándose", True),
    ("el-botijo-revisitado", OLD / "public/images/projects/el-botijo-revisitado/04.webp", "04.webp", "Detalle material de la familia de botijos escultóricos", True),
    ("hangar", OLD / "public/images/projects/hangar/06.webp", "06.webp", "Señoras de hierro instaladas en la exposición Hangar", False),
    ("memorias-de-agua-y-barro", OLD / "public/images/projects/memorias-de-agua-y-barro/05.webp", "05.webp", "Coloquio de Memorias de agua y barro en Fresca. La nave", False),
    ("sin-embargo-se-mueve", OLD / "public/images/projects/sin-embargo-se-mueve/03.webp", "03.webp", "Mesa de la cena inmersiva Sin embargo, se mueve", False),
]


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text())
    for slug, source, source_name, alt, home in ASSETS:
        if not source.exists():
            raise FileNotFoundError(source)
        content_dir = REPO / "content/projects" / slug
        output_dir = REPO / "public/images/projects" / slug
        content_dir.mkdir(parents=True, exist_ok=True)
        output_dir.mkdir(parents=True, exist_ok=True)
        local_source = content_dir / source_name
        shutil.copy2(source, local_source)
        output_name = web_filename(source_name)
        width, height = prepare_image(local_source, output_dir / output_name)
        entries = manifest[slug]
        entry = next((item for item in entries if item.get("file") == output_name), None)
        values = {"source": source_name, "alt": alt, "width": width, "height": height, "file": output_name}
        if home:
            values["home"] = True
        if entry:
            entry.update(values)
        else:
            entries.append(values)
        print(f"{slug}/{output_name} <- {source}")

    header_source = DESKTOP / "LA FORMA DEL AGUA QUIETA/Fotos dossier/La forma del agua quieta_Brenda Ranieri2.png"
    header_local = REPO / "content/home/header/La forma del agua quieta_Brenda Ranieri2.png"
    shutil.copy2(header_source, header_local)
    prepare_image(header_local, REPO / "public/images/hero-la-forma-del-agua-quieta-original.webp")

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
