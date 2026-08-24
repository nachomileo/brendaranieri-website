"""Import legacy project images downloaded from the previous portfolio.

The downloader is intentionally separate: this script only reads local files,
normalizes them through the site's existing image pipeline and appends missing
manifest entries without replacing curated images.
"""

from pathlib import Path
import json
import sys

from image_pipeline import prepare_image, web_filename


repo = Path(__file__).resolve().parents[1]
manifest_path = repo / "data/project-images.json"
manifest = json.loads(manifest_path.read_text())


def import_folder(slug: str, source_dir: Path) -> None:
    entries = manifest[slug]
    used_files = {entry["file"] for entry in entries}
    existing_sources = {web_filename(entry["source"]) for entry in entries}
    output_dir = repo / "public/images/projects" / slug

    for source in sorted(path for path in source_dir.iterdir() if path.is_file()):
        candidate = web_filename(source.name)
        if candidate in existing_sources or candidate in used_files:
            continue

        width, height = prepare_image(source, output_dir / candidate)
        entries.append({
            "source": source.name,
            "alt": f"{slug.replace('-', ' ')}, imagen de archivo",
            "width": width,
            "height": height,
            "file": candidate,
            "kind": "archive",
        })
        used_files.add(candidate)
        existing_sources.add(candidate)
        print(f"{slug}/{candidate} <- {source.name}")


if __name__ == "__main__":
    legacy_root = Path(sys.argv[1])
    import_folder("lo-velado", legacy_root / "lo-velado")
    import_folder("certezas", legacy_root / "certezas")
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
