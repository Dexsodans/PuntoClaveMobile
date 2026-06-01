from api.models.rutas_ubicaciones_model import RutaUbicacion
from api.models.pedido_model import Pedido
from api.models.ubicacion_model import Ubicacion

from rest_framework.response import Response
import datetime
from api.queries.cliente_queries import get_cliente_by_user_id




def get_pedidos_ruta(id_ruta):

    rutas_ubicaciones = RutaUbicacion.objects.filter(
        id_ruta=id_ruta
    ).select_related(
        "id_ubi"
    )

    data = []

    for ruta_ubi in rutas_ubicaciones:

        pedido = Pedido.objects.filter(
            id_ubi=ruta_ubi.id_ubi
        ).select_related(
            "id_cli",
            "id_ubi"
        ).first()

        data.append({
            "id_ruta_ubi": ruta_ubi.id,
            "ORDEN_ENTREGA": ruta_ubi.ORDEN_ENTREGA,

            "ubicacion": {
                "id": ruta_ubi.id_ubi.id,
                "COD_UBI": ruta_ubi.id_ubi.COD_UBI,
                "LATITUD_UBI": ruta_ubi.id_ubi.LATITUD_UBI,
                "LONGITUD_UBI": ruta_ubi.id_ubi.LONGITUD_UBI,
                "DIRECCION_UBI": ruta_ubi.id_ubi.DIRECCION_UBI,
            },

            "pedido": {
                "id": pedido.id,
                "COD_PEDI": pedido.COD_PEDI,
                "TOTAL_PEDI": pedido.TOTAL_PEDI,
                "FECHA_PEDI": pedido.FECHA_PEDI,
                "EST_PEDI": pedido.EST_PEDI,
            } if pedido else None
        })

    return data


""" def get_for_cliente(id_usu):

    cliente = get_cliente_by_user_id(id_usu)

    if not cliente:
        return None

    pedidos = Pedido.objects.filter(
        id_cli=cliente.id
    ).select_related(
        "id_ubi"
    ).prefetch_related(
        "detallepedido_set__id_pro"
    )

    data = []

    for pedido in pedidos:
        data.append({
            "id": pedido.id,
            "COD_PEDI": pedido.COD_PEDI,
            "TOTAL_PEDI": pedido.TOTAL_PEDI,
            "FECHA_PEDI": pedido.FECHA_PEDI,
            "EST_PEDI": pedido.EST_PEDI,

            "ubicacion": {
                "id": pedido.id_ubi.id if pedido.id_ubi else None,
                "COD_UBI": pedido.id_ubi.COD_UBI if pedido.id_ubi else None,
                "LATITUD_UBI": pedido.id_ubi.LATITUD_UBI if pedido.id_ubi else None,
                "LONGITUD_UBI": pedido.id_ubi.LONGITUD_UBI if pedido.id_ubi else None,
                "DIRECCION_UBI": pedido.id_ubi.DIRECCION_UBI if pedido.id_ubi else None,
            },

            "productos": [
                {
                    "id_pro": detalle.id_pro.id,
                    "NOM_PRO": detalle.id_pro.NOM_PRO,
                    "CANT_CAR": detalle.CANT_DET_PEDI,
                    "SUB_TOTAL_CAR": detalle.SUB_TOTAL_DET_PEDI,
                }
                for detalle in pedido.detallepedido_set.all()
            ]
        })

    return data """