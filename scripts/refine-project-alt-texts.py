"""Replace generic recovered-image alt text after visual contact-sheet review."""

from pathlib import Path
import json
import re


PATH = Path(__file__).resolve().parents[1] / "data/project-images.json"
GENERIC = re.compile(r"imagen( de archivo)?|image", re.IGNORECASE)

ALT_TEXTS = {
    "la-forma-del-agua-quieta": [
        "Fuente cerámica vertical activada por agua en el patio de grava",
        "Fuente cerámica vertical junto al muro de ladrillo del patio",
        "Tres vasijas oscuras dispuestas sobre la grava",
        "Pequeña pieza cerámica azul fijada a una puerta de madera",
        "Azulejo cerámico con figura lineal azul instalado en el muro",
        "Placa cerámica rectangular con trazos azules sobre pared blanca",
        "Detalle de una pieza cerámica que abraza el tronco de un árbol",
        "Detalle del agua circulando por los cuencos de una fuente cerámica",
        "Fuente cerámica integrada entre las hojas y el agua del jardín",
        "Pequeña vasija y placa cerámica suspendidas sobre pared blanca",
        "Placa cerámica clara instalada sobre un muro de ladrillo",
        "Díptico de placas cerámicas marrones unido sobre pared blanca",
        "Vista completa de una fuente cerámica vertical en el patio",
        "Escultura cerámica antropomorfa instalada en un nicho exterior",
        "Activación manual de una fuente con una pequeña pieza porosa",
        "Base cilíndrica de la fuente dentro de un estanque circular",
    ],
    "certezas": [
        "Monotipo 4 am con dibujo azul sobre papel blanco",
        "Visitantes observando obra gráfica en la escalera de El Imparcial",
        "Público reunido ante las obras de la exposición Certezas",
        "Consulta de textos y documentos sobre una mesa de exposición",
        "Escultura cerámica Cara de jarrón con volumen marrón y asas laterales",
        "Monotipo azul y amarillo sobre papel japonés",
        "Monotipo Debajo de la silla con dibujo botánico azul",
        "Escultura cerámica blanca La bocca della verità",
        "Monotipo La mesa es sagrada en azul profundo",
        "Óleo sobre papel Me revuelco con mi sombra",
        "Monotipo Mercurio con campo azul y figura central",
        "Monotipo Sale el sol, se baila malambo con dibujo lineal azul",
        "Monotipo Todas las cosas tienen música con figuras azules",
        "Monotipo Tráeme la noche con paisaje blanco sobre azul",
        "Hoja de textos y dibujos que reúne las frases de Certezas",
    ],
    "lo-velado": [
        "Fuente cerámica oscura de cuatro niveles sobre base mineral",
        "Fuente cerámica instalada en el centro de la sala de Lo velado",
        "Obra gráfica azul con fuente y vegetación instalada en pared",
        "Placa cerámica verde y ocre suspendida sobre pared blanca",
        "Detalle lateral de la fuente cerámica y las piezas del muro",
        "Pequeña escultura cerámica zoomorfa proyectando su sombra",
        "Escultura cerámica negra con forma de ave sobre pared blanca",
        "Relieve cerámico azul con pequeñas flores incrustadas",
        "Escultura cerámica tubular con dos aberturas sobre pared",
        "Mesa de archivo con cuencos, placas y pruebas cerámicas azules",
        "Obra gráfica azul con formas de jardín y arquitectura",
        "Obra gráfica oscura con vegetación y veladuras claras",
        "Escultura metálica vertical semejante a una trama vegetal",
        "Relieve metálico orgánico suspendido en pared blanca",
        "Tarjetas de sala y lápices dispuestos sobre una mesa",
        "Serie de seis pequeñas obras gráficas azules instalada en pared",
        "Escultura cerámica cuadrúpeda con esmalte claro y azul",
        "Obra gráfica enmarcada con campo azul y dibujo inferior",
        "Obra gráfica enmarcada con retícula clara sobre fondo verde",
        "Vista longitudinal de la exposición Lo velado",
        "Vasija oscura con asas circulares instalada sobre una repisa",
        "Monitor y pequeñas piezas cerámicas en una mesa de sala",
        "Vista cenital del archivo de cerámicas, dibujos y muestras materiales",
        "Detalle cenital de placas, minerales y objetos del archivo",
        "Mesa completa del archivo material dentro del estudio",
        "Brenda Ranieri ordenando piezas y muestras sobre la mesa",
        "Visita colectiva a la exposición Lo velado en Fresca. La nave",
    ],
    "oax-car-38-57": [
        "Vista general del Open Studio OAX-CAR-38-57 con estructuras metálicas",
        "Recorrido longitudinal por la instalación OAX-CAR-38-57",
        "Muro con dibujos, documentos y fragmentos del archivo material",
        "Vista de sala con piezas alineadas sobre una estructura baja",
        "Vista general de la instalación desde la entrada del estudio",
        "Estructura metálica con objetos cerámicos en el centro de la sala",
        "Carrito metálico con piezas frente a una serie de fotografías",
        "Mesa baja con pruebas lineales de materiales y esmaltes",
        "Fragmento cerámico poroso colocado sobre una estructura metálica",
        "Cuenco de arcilla roja con interior azul sobre perfil metálico",
        "Relieve cerámico con inclusiones rojas instalado en un carrito",
        "Pequeña pieza cerámica atravesada por una lámina metálica",
        "Vasija y fragmento cerámico instalados sobre una peana mineral",
        "Vasija roja con asas circulares sobre bloque cerámico",
        "Reliquia cerámica con pieza metálica azul sobre pedestal",
        "Cuenco blanco atravesado por una pieza metálica sobre ladrillos",
        "Carrito metálico con vasija y fotografías analógicas al fondo",
        "Estructura metálica horizontal con piezas cerámicas y documentos",
        "Placa cerámica con relieve inspirado en el Códice de Madrid",
        "Detalle de placa cerámica con iconografía lineal",
        "Placa cerámica en primer plano dentro del recorrido expositivo",
        "Tríptico de rayogramas montados sobre papel blanco",
        "Serie de tres rayogramas oscuros montados sobre papel",
        "Tres rayogramas de agua instalados directamente sobre el muro",
        "Vasija sobre estructura metálica frente al archivo fotográfico",
        "Composición mural de cerámica, metal y fragmentos documentales",
        "Conjunto mural de pequeñas placas y pruebas cerámicas",
        "Placa cerámica rectangular con dibujo negro en relieve",
        "Fragmento cerámico blanco con marca circular de óxido",
        "Pequeña placa cerámica horizontal instalada sobre el muro",
        "Dos fotografías analógicas montadas sobre paspartú blanco",
        "Placa cerámica clara con veladuras ocres y azules",
        "Tríptico de rayogramas de agua en blanco y negro",
    ],
}


def main() -> None:
    manifest = json.loads(PATH.read_text())
    for slug, descriptions in ALT_TEXTS.items():
        targets = [item for item in manifest[slug] if GENERIC.search(item.get("alt", ""))]
        if len(targets) != len(descriptions):
            raise RuntimeError(f"{slug}: {len(targets)} targets, {len(descriptions)} descriptions")
        for item, description in zip(targets, descriptions):
            item["alt"] = description
    PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
