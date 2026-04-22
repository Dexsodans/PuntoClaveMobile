from api.models.ubicacion_model import Ubicacion
from api.queries.ubicacion_queries import *
import re

def get_all():
    return Ubicacion.objects.all().values()

def create(LATITUD_UBI, LONGITUD_UBI, DIRECCION_UBI):
    #CONSEGUIMOS EL ULTIMO ID
    last_id = get_last_id()
    #LO VOLVEMOS EL ID NECESARIO PARA HACER EL CODIGO DE UBICACION
    id= last_id + 1

    ubicacion = Ubicacion(
        COD_UBI=f"UBI-{str(id).zfill(5)}",
        DIRECCION_UBI=DIRECCION_UBI,
        LATITUD_UBI=LATITUD_UBI,
        LONGITUD_UBI=LONGITUD_UBI
    )
    ubicacion.save()

    return ubicacion