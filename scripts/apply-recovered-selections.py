"""Apply the curated Home and archive selections from BASE textos.md."""

from pathlib import Path


PATH = Path(__file__).resolve().parents[1] / "lib/project-images.ts"


def replace_once(text: str, old: str, new: str) -> str:
    if text.count(old) != 1:
        raise RuntimeError(f"Expected one occurrence, found {text.count(old)}: {old}")
    return text.replace(old, new)


def main() -> None:
    text = PATH.read_text()
    replacements = {
        '  "cosas-que-cargan-cosas": ["lo-atamos-con-alambre-brenda-ranieri.webp", "cosas-que-cargan-cosas-brenda-ranieri-24.webp", "img-9946.webp", "img-9969.webp"],': '  "cosas-que-cargan-cosas": ["05.webp", "cosas-que-cargan-cosas-brenda-ranieri-24.webp", "01.webp", "04.webp"],',
        '  "el-botijo-revisitado": ["botijos-san-isidro-brenda-ranieri-2.webp", "botijos-san-isidro-brenda-ranieri-6.webp", "botijos-matadero-madrid-brenda-ranieri.webp"],': '  "el-botijo-revisitado": ["02.webp", "04.webp", "botijos-matadero-madrid-brenda-ranieri-2.webp"],',
        '  "bioceramica-a-base-de-residuos-de-cafe": ["brenda2.webp", "brenda14.webp", "brenda1.webp", "bioceramica-cafe-brenda-ranieri-35.webp"],': '  "bioceramica-a-base-de-residuos-de-cafe": ["brenda2.webp", "brenda13.webp", "01.webp", "brenda3.webp"],',
        '  "todo-lo-profundo-ama-el-disfraz": "br-tlpaed-11-scaled.webp",': '  "todo-lo-profundo-ama-el-disfraz": "06.webp",',
        '  "cosas-que-cargan-cosas": "lo-atamos-con-alambre-brenda-ranieri.webp",': '  "cosas-que-cargan-cosas": "04.webp",',
        '  "el-botijo-revisitado": "botijos-matadero-madrid-brenda-ranieri.webp",': '  "el-botijo-revisitado": "botijos-matadero-madrid-brenda-ranieri-2.webp",',
        '  "bioceramica-a-base-de-residuos-de-cafe": "brenda2.webp",': '  "bioceramica-a-base-de-residuos-de-cafe": "brenda6.webp",',
        '  hangar: "2025-10-04-artelier-21-gp23604.webp",': '  hangar: "06.webp",',
        '  "memorias-de-agua-y-barro": "memorias-de-agua-y-barro-open-galeria-5.webp",': '  "memorias-de-agua-y-barro": "05.webp",\n  "ohm-2025-anarqueologias": "open-studio-br-ohm-69.webp",\n  "sin-embargo-se-mueve": "03.webp",\n  certezas: "brenda-ranieri-certezas-expo-el-imparcial39.webp",',
    }
    for old, new in replacements.items():
        text = replace_once(text, old, new)
    PATH.write_text(text)


if __name__ == "__main__":
    main()
