# Flujo de imágenes

`content/` es un archivo local de trabajo y está excluido de Git. Contiene las fotografías originales sin redimensionar ni comprimir. No es necesario para compilar o desplegar el sitio: el repositorio conserva los manifiestos en `data/` y las imágenes WebP publicables en `public/images/`.

## Nombres y trazabilidad

Cada WebP deriva su nombre del archivo original. Se eliminan tildes y caracteres problemáticos para producir una URL estable:

```text
OAX-CAR-38-57_Brenda Ranieri_15 Large.jpeg
→ oax-car-38-57-brenda-ranieri-15-large.webp
```

Los manifiestos `data/artwork-images.json` y `data/project-images.json` conservan `source`, el nombre original, y `file`, el nombre público. Si dos fuentes producen el mismo nombre normalizado, se añade un sufijo numérico estable.

## Preparación

Los scripts requieren Python 3 y Pillow. Generan imágenes RGB en WebP, con un máximo de 2400 × 2400 píxeles, calidad 88 y orientación EXIF aplicada.

```bash
python3 -m pip install -r requirements-images.txt
```

```bash
pnpm images:artworks
pnpm images:projects
pnpm images:journal
pnpm images:oax-archive
```

Para regenerar todas las imágenes:

```bash
pnpm images:prepare
```

Los originales deben existir localmente bajo la estructura esperada en `content/`. Antes de eliminar esa carpeta en un equipo, hay que comprobar que existe otra copia de trabajo: Git no permite recuperarla.
