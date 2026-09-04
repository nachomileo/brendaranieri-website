"""Synchronize manifest dimensions with the optimized files on disk."""
from pathlib import Path
import json
from PIL import Image

root = Path(__file__).resolve().parents[1]
manifest_path = root / "data/project-images.json"
manifest = json.loads(manifest_path.read_text())
changed = []

for slug, images in manifest.items():
    for image in images:
        path = root / "public/images/projects" / slug / image["file"]
        if not path.exists():
            continue
        with Image.open(path) as source:
            width, height = source.size
        if (image["width"], image["height"]) != (width, height):
            changed.append((slug, image["file"], image["width"], image["height"], width, height))
            image["width"], image["height"] = width, height

manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
for item in changed:
    print(*item)
print(f"Synchronized {len(changed)} image records")
