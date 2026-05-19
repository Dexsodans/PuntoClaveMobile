
from django.db import connection

#conseguir el ultimo id de pedido

def get_last_id():
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM detalle_compras ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
    return row[0] if row else None