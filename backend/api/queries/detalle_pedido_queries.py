# api/services/ubicacion_service.py

from api.models.detalle_pedido_model import DetallePedido
from django.db import connection

#conseguir el ultimo id de pedido

def get_last_id():
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM detalle_pedidos ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
    return row[0] if row else None