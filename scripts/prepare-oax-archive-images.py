from pathlib import Path

from image_pipeline import prepare_image, web_filename


repo = Path(__file__).resolve().parents[1]
source_root = repo / "content/projects/oax-car-38-57/public-archive-sources"
output_root = repo / "public/images/projects/oax-car-38-57"
image_extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

for group in ("Archivo 35mm", "Rayogramas"):
    source_dir = source_root / group
    output_dir = output_root / group
    output_dir.mkdir(parents=True, exist_ok=True)
    used: set[str] = set()
    for source in sorted(source_dir.iterdir(), key=lambda path: path.name):
        if source.suffix.lower() not in image_extensions:
            continue
        output = output_dir / web_filename(source.name, used)
        prepare_image(source, output)
        print(f"{group}/{output.name} <- {source.name}")
