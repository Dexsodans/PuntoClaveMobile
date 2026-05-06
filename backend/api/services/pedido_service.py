from api.models.pedido_model import Pedido
from api.models.ubicacion_model import Ubicacion
from api.queries.pedidos_queries import *
from rest_framework.response import Response
import datetime
from api.queries.cliente_queries import get_cliente_by_user_id

def get_all():
    return Pedido.objects.all().values()

def create(id_usu, id_ubi, TOTAL_PEDI, FECHA_PEDI):
    #para tener cliente
    cliente = get_cliente_by_user_id(id_usu)

    if not cliente:
        return Response({
            "success": False,
            "message": "Cliente no encontrado"
        }, status=404)
    #para tener ubicacion
    ubicacion = Ubicacion.objects.filter(id=id_ubi).first()
    if not ubicacion:
        return Response({
            "success": False,
            "message": "Ubicación no encontrada"
        }, status=404)

    last_id = get_last_id()
    id = last_id + 1

    pedido = Pedido(
        COD_PEDI=f"PEDI-{str(id).zfill(5)}",
        FECHA_PEDI=FECHA_PEDI,
        id_cli=cliente,   # ← usar directamente
        id_ubi=ubicacion,
        TOTAL_PEDI=TOTAL_PEDI
    )

    pedido.save()
    return pedido

""" def get_for_cliente(id_usu):

    cliente = get_cliente_by_user_id(id_usu)

    if not cliente:
        return None

    pedidos = Pedido.objects.filter(id_cli=cliente.id).values()

    return pedidos
 """
def get_for_cliente(id_usu):

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

    return pedidos