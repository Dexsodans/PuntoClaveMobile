# api/services/producto_service.py

from api.models.ubicacion_model import Ubicacion
from django.db import connection

#conseguir el ultimo id de ubicacion

def get_last_id():
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM ubicaciones ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
    return row[0] if row else None