from pathlib import Path
from PIL import Image, ImageOps
import json
from image_pipeline import assign_filenames

repo = Path(__file__).resolve().parents[1]
manifest_path = repo / "data/project-images.json"
manifest = json.loads(manifest_path.read_text())

projects = {
    "la-forma-del-agua-quieta": {
        "home": [
            "home-06.webp",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_69.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_27.png",
            "home-08.webp",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_8.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_40.png",
        ],
        "gallery": [
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_5.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_9.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_53.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_12.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_13.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_28.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_45.png",
            "La forma del agua quieta_072026_Brenda Ranieri_Lapislazuli_52.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli5.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli9.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli10.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli12.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli13.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli14.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli27.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli33.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli36.png",
            "La forma del agua quieta_Brenda Ranieri_Lapislazuli8.png",
        ],
    },
    "oax-car-38-57": {
        "home": [
            "home-02.webp", "home-04.webp", "home-05.webp",
            "OAX-CAR-38-57_Open studio_Brenda Ranieri_70_retouched.png",
            "OAX-CAR-38-57_Open studio_Brenda Ranieri_15.png",
            "OAX-CAR-38-57_Open studio_Brenda Ranieri_47.png", "Scan 49.png",
        ],
        "gallery": [
            *[f"OAX-CAR-38-57_Open studio_Brenda Ranieri_{number}.png" for number in [87, 1, 14, 3, 88, 26, 27, 66, 62, 29, 33, 36, 43, 44, 48, 53, 7, 63, 67, 72, 73, 74, 79, 80, 81, 82, 12, 16, 17, 20, 22, 37, 39, 65]],
            "Scan 51.png", "Scan 52.png", "Scan 53.png", "Scan 57.png",
        ],
    },
}

for slug, groups in projects.items():
    source_dir = repo / "content/projects" / slug
    known = {item["source"]: item for item in manifest.get(slug, [])}
    ordered = groups["home"] + groups["gallery"]
    images = []
    for index, source_name in enumerate(ordered):
        source = source_dir / source_name
        if not source.exists() or source_name in {item["source"] for item in images}:
            continue
        with Image.open(source) as raw:
            image = ImageOps.exif_transpose(raw)
            width, height = image.size
        previous = known.get(source_name, {})
        item = {
            "source": source_name,
            "alt": previous.get("alt", f"{slug.replace('-', ' ')}, imagen {len(images) + 1}"),
            "width": width,
            "height": height,
        }
        if index < len(groups["home"]):
            item["home"] = True
        if source_name.startswith("Scan "):
            item["kind"] = "archive"
        images.append(item)
    manifest[slug] = images
    assign_filenames(manifest[slug])

manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
