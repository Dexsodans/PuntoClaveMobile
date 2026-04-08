# api/services/producto_service.py

from api.models.producto import Producto
from django.db import connection


def get_producto_by_id(producto_id):

    try:
        return Producto.objects.get(id=producto_id)
    except Producto.DoesNotExist:
        return None