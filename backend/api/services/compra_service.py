from api.models.compra_model import Compra
from api.models.user_model import User
from api.queries.compras_queries import *
from rest_framework.response import Response
import datetime

def get_all():
    return Compra.objects.all().values()

def create(id_usu, FACTURA_COMPRA, TOTAL_COM, FECHA_COM):
    #para tener cliente

    if not id_usu:
        return Response({
            "success": False,
            "message": "Usuario no encontrado"
        }, status=404)

    last_id = get_last_id()
    id = last_id + 1

    compra = Compra(
        COD_COM=f"COM-{str(id).zfill(5)}",
        FACTURA_COMPRA = FACTURA_COMPRA,
        FECHA_COM=FECHA_COM,
        id_admin=id_usu,   # ← usar directamente,
        TOTAL_COM=TOTAL_COM

    )

    compra.save()
    return compra


""" def get_for_cliente(id_usu):

    cliente = get_cliente_by_user_id(id_usu)

    if not cliente:
        return None

    pedidos = Pedido.objects.filter(id_cli=cliente.id).select_related("id_ubi").values(
        "id",
        "COD_PEDI",
        "TOTAL_PEDI",
        "FECHA_PEDI",
        "EST_PEDI",

        "id_ubi",
        "id_ubi__COD_UBI",
        "id_ubi__LATITUD_UBI",
        "id_ubi__LONGITUD_UBI",
        "id_ubi__DIRECCION_UBI",
    )

    return pedidos """