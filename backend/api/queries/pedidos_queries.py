# api/services/ubicacion_service.py

from api.models.pedido_model import Pedido
from django.db import connection

#conseguir el ultimo id de pedido

def get_last_id():
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM pedidos ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
    return row[0] if row else None

def get_id_for_caja(id_caja):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT p.id
            FROM pedidos p
            INNER JOIN ubicaciones u ON p.id_ubi = u.id
            INNER JOIN rutas_ubicaciones ru ON u.id = ru.id_ubi
            INNER JOIN rutas r ON ru.id_ruta = r.id
            INNER JOIN cajas c ON r.id = c.id_ruta
            WHERE c.id = %s
        """, [id_caja])

        rows = cursor.fetchall()

    return [row[0] for row in rows]