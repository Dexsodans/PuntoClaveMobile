from api.models.producto import Producto
import re
from django.db import connection


def get_all():
    return Producto.objects.all().values()

def get_productos_inventario():

    query = """
        SELECT 
            p.*,
            pr."NOM_PROV",
            pr."EMAIL_PROV",
            pr."TEL_PROV",
            i."stock_actual_inv",
            i."stock_min_inv",
            i."stock_max_inv"
        FROM productos p
        LEFT JOIN proveedores pr
            ON p."id_prov" = pr."id"
        LEFT JOIN inventarios i
            ON p."id" = i."id_pro"
    """

    with connection.cursor() as cursor:
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]
        results = [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

    return results
