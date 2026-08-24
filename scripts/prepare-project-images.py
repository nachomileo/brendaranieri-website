from pathlib import Path
import json
from image_pipeline import assign_filenames, prepare_image

repo = Path(__file__).resolve().parents[1]
manifest_path = repo / "data/project-images.json"
manifest = json.loads(manifest_path.read_text())

for slug, images in manifest.items():
    assign_filenames(images)
    source_dir = repo / "content/projects" / slug
    output_dir = repo / "public/images/projects" / slug
    output_dir.mkdir(parents=True, exist_ok=True)
    for item in images:
        source = source_dir / item["source"]
        output = output_dir / item["file"]
        item["width"], item["height"] = prepare_image(source, output)
        print(f"{slug}/{output.name} <- {source.name}")

manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
