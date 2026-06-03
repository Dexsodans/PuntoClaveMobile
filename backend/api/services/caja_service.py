from api.models.caja_model import Caja
from api.queries.pedidos_queries import get_id_for_caja
from api.models.pedido_model import Pedido

from rest_framework.response import Response
import datetime
from api.queries.cliente_queries import get_cliente_by_user_id




def get_for_ruteador(id_usu):
    caja = Caja.objects.filter(
        id_usu=id_usu
    )
    return caja

#cambiar estado a 2

def estado_2(id_caja):

    # Actualizar caja
    caja = Caja.objects.get(id=id_caja)
    caja.EST_CAJA = 2
    caja.save()

    # Obtener ids de pedidos relacionados
    pedidos_ids = get_id_for_caja(id_caja)

    # Actualizar todos los pedidos a estado 2
    Pedido.objects.filter(
        id__in=pedidos_ids
    ).update(
        EST_PEDI=2
    )

    return caja


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