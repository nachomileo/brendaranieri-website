"""Install the approved retouched hero without overwriting the source image."""

from pathlib import Path
import shutil

from image_pipeline import prepare_image


REPO = Path(__file__).resolve().parents[1]
GENERATED = Path("/Users/brendaranieri/.codex/generated_images/01a01e35-28f0-7f43-a549-f776b19058f8/exec-30d4c3a5-6913-4cff-a641-3c2d0fbeb30c.png")
SOURCE_COPY = REPO / "content/home/header/La forma del agua quieta_Brenda Ranieri2_retouched.png"
PUBLIC_IMAGE = REPO / "public/images/hero-la-forma-del-agua-quieta-final.webp"


def replace_once(path: Path, old: str, new: str) -> None:
    text = path.read_text()
    if old not in text:
        raise RuntimeError(f"Expected reference not found in {path}: {old}")
    path.write_text(text.replace(old, new))


SOURCE_COPY.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(GENERATED, SOURCE_COPY)
prepare_image(SOURCE_COPY, PUBLIC_IMAGE)

replace_once(
    REPO / "app/page.tsx",
    "/images/hero-la-forma-del-agua-quieta-retouched.webp",
    "/images/hero-la-forma-del-agua-quieta-final.webp",
)
replace_once(
    REPO / "app/layout.tsx",
    "/images/hero-la-forma-del-agua-quieta-retouched.png",
    "/images/hero-la-forma-del-agua-quieta-final.webp",
)

write_test = REPO / "scripts/.codex-write-test"
if write_test.exists():
    write_test.unlink()

print(PUBLIC_IMAGE)
