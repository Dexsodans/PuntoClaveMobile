import pytesseract
import cv2
import numpy as np
import re

from PIL import Image
from difflib import SequenceMatcher
from api.models.producto import Producto


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


# ==============================
# PREPROCESAMIENTO DE IMAGEN
# ==============================

def mejorar_imagen(imagen_file):
    file_bytes = np.asarray(bytearray(imagen_file.read()), dtype=np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.convertScaleAbs(gray, alpha=1.5, beta=0)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(
        blur, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    )
    return thresh


# ==============================
# OCR
# ==============================

def extraer_texto_factura(imagen_file):
    img = mejorar_imagen(imagen_file)
    config = r'--oem 3 --psm 6'
    texto = pytesseract.image_to_string(img, lang="spa", config=config)
    return texto.strip()


# ==============================
# PRODUCTOS DEL PROVEEDOR
# ==============================

def obtener_productos_proveedor(id_prov: int):
    productos = Producto.objects.filter(
        id_prov=id_prov,
        EST_PRO=True
    ).values(
        "id",
        "NOM_PRO",
        "PRECIO_VENTA_PRO",  # usamos precio de venta, no de compra
        "COD_PRO"
    )
    return list(productos)


# ==============================
# SIMILITUD
# ==============================

def limpiar_texto(texto):
    texto = texto.lower()
    texto = re.sub(r'[^a-z0-9 ]', '', texto)
    return texto.strip()


def similitud(a, b):
    a = limpiar_texto(a)
    b = limpiar_texto(b)
    return SequenceMatcher(None, a, b).ratio()


# ==============================
# CANTIDAD
# ==============================

def extraer_cantidad(linea):
    patrones = [
        r'(\d+)\s*[xX×]',
        r'[xX×]\s*(\d+)',
        r'\s(\d+)\s*$',
        r'^(\d+)\s'
    ]
    for patron in patrones:
        match = re.search(patron, linea)
        if match:
            return int(match.group(1))
    return 1


# ==============================
# FILTRO DE LINEAS BASURA
# ==============================

def linea_irrelevante(linea):
    palabras = [
        "recibo", "total", "fecha", "ruc",
        "lugar", "nombre", "monto", "pagado", "razon"
    ]
    linea_lower = linea.lower()
    for palabra in palabras:
        if palabra in linea_lower:
            return True
    return False


# ==============================
# MAPEO DE PRODUCTOS
# ==============================

def mapear_productos(texto_ocr, productos):
    UMBRAL_SIMILITUD = 0.35

    lineas = [l.strip() for l in texto_ocr.splitlines() if l.strip()]
    detectados = []
    ids_agregados = set()

    for linea in lineas:
        if linea_irrelevante(linea):
            continue

        mejor_producto = None
        mejor_score = 0

        for producto in productos:
            score = similitud(linea, producto["NOM_PRO"])
            if score > mejor_score:
                mejor_score = score
                mejor_producto = producto

        if mejor_producto and mejor_score >= UMBRAL_SIMILITUD:
            if mejor_producto["id"] not in ids_agregados:
                cantidad = extraer_cantidad(linea)

                # Solo mandamos id, nombre, cantidad y precio de BD
                # El frontend calcula el subtotal
                detectados.append({
                    "id": mejor_producto["id"],
                    "NOM_PRO": mejor_producto["NOM_PRO"],
                    "cantidad": cantidad if cantidad > 0 else 1,
                    "PRECIO_VENTA_PRO": float(mejor_producto["PRECIO_VENTA_PRO"] or 0),
                    "score": round(mejor_score, 2),
                })
                ids_agregados.add(mejor_producto["id"])

    return detectados


# ==============================
# PROCESAMIENTO COMPLETO
# ==============================

def procesar_factura_ocr(imagen_file, id_prov):
    texto = extraer_texto_factura(imagen_file)

    if not texto:
        return {
            "success": False,
            "error": "No se pudo extraer texto de la imagen.",
            "productos": []
        }

    productos = obtener_productos_proveedor(id_prov)

    if not productos:
        return {
            "success": False,
            "error": "El proveedor no tiene productos registrados.",
            "productos": []
        }

    productos_detectados = mapear_productos(texto, productos)

    return {
        "success": True,
        "texto_extraido": texto,
        "productos": productos_detectados
    }