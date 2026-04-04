from ..queries.producto_queries import get_productos_activos

def listar_productos():
    productos = get_productos_activos()

    data = []
    for p in productos:
        data.append({
            "id": p.id,
            "NOM_PRO": p.NOM_PRO,
            "DESC_PRO": p.DESC_PRO,
            "PRECIO_VENTA_PRO": float(p.PRECIO_VENTA_PRO) if p.PRECIO_VENTA_PRO else 0,
            "IMAGEN_PRO": p.IMAGEN_PRO
        })

    return data