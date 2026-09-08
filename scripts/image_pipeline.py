from pathlib import Path
import re
import unicodedata

from PIL import Image, ImageOps

MAX_IMAGE_DIMENSION = 2400
WEBP_QUALITY = 85


def web_filename(source_name: str, used: set[str] | None = None) -> str:
    """Return a readable, URL-safe WebP filename derived from the source."""
    stem = Path(source_name).stem
    ascii_stem = unicodedata.normalize("NFKD", stem).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_stem.lower()).strip("-") or "image"
    candidate = f"{slug}.webp"
    if used is None:
        return candidate

    suffix = 2
    while candidate in used:
        candidate = f"{slug}-{suffix}.webp"
        suffix += 1
    used.add(candidate)
    return candidate


def assign_filenames(items: list[dict]) -> None:
    used: set[str] = set()
    for item in items:
        item["file"] = web_filename(item["source"], used)


def prepare_image(source: Path, output: Path) -> tuple[int, int]:
    output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        image.thumbnail((MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION), Image.Resampling.LANCZOS)
        image.save(output, "WEBP", quality=WEBP_QUALITY, method=6)
        return image.size
