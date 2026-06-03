from api.models.pedido_model import Pedido
from api.models.detalle_pedido_model import DetallePedido
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

def update_estado(id_pedi, est_pedi):
    """Actualiza el estado del pedido. Estados: 1=pendiente, 2=en camino, 3=entregado, 4=cancelado"""
    try:
        pedido = Pedido.objects.get(id=id_pedi)
        pedido.EST_PEDI = est_pedi
        pedido.save()
        return pedido
    except Pedido.DoesNotExist:
        return None
    
def get_detalle_pedido(id_pedi):
    """Retorna un pedido con sus productos (para comprobante y detalle)."""
    try:
        pedido = Pedido.objects.select_related("id_ubi", "id_cli").get(id=id_pedi)
    except Pedido.DoesNotExist:
        return None
 
    detalles = DetallePedido.objects.filter(id_pedi=pedido.id).select_related("id_pro").values(
        "id",
        "COD_DET_PEDI",
        "CANT_DET_PEDI",
        "SUB_TOTAL_DET_PEDI",
        "id_pro__id",
        "id_pro__NOM_PRO",
        "id_pro__IMAGEN_PRO",
        "id_pro__PRECIO_VENTA_PRO",
    )
 
    return {
        "id": pedido.id,
        "COD_PEDI": pedido.COD_PEDI,
        "TOTAL_PEDI": str(pedido.TOTAL_PEDI),
        "FECHA_PEDI": pedido.FECHA_PEDI,
        "EST_PEDI": pedido.EST_PEDI,
        "ubicacion": {
            "id": pedido.id_ubi.id,
            "DIRECCION_UBI": pedido.id_ubi.DIRECCION_UBI,
            "LATITUD_UBI": pedido.id_ubi.LATITUD_UBI,
            "LONGITUD_UBI": pedido.id_ubi.LONGITUD_UBI,
        },
        "detalles": [
            {
                "id": d["id"],
                "COD_DET_PEDI": d["COD_DET_PEDI"],
                "CANT_DET_PEDI": d["CANT_DET_PEDI"],
                "SUB_TOTAL_DET_PEDI": str(d["SUB_TOTAL_DET_PEDI"]),
                "producto": {
                    "id": d["id_pro__id"],
                    "NOM_PRO": d["id_pro__NOM_PRO"],
                    "IMAGEN_PRO": d["id_pro__IMAGEN_PRO"],
                    "PRECIO_VENTA_PRO": str(d["id_pro__PRECIO_VENTA_PRO"]),
                },
            }
            for d in detalles
        ],
    }


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

def get_for_cliente(id_usu):

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

    return data

##cambiar estado a 3

def entregar_pedido(id_pedi):
    try:
        pedido = Pedido.objects.get(id=id_pedi)
        pedido.EST_PEDI = 3  # Estado "entregado"
        pedido.save()
        return pedido
    except Pedido.DoesNotExist:
        return None
    
def codigo_por_pedido(id_pedi):
    try:
        pedido = Pedido.objects.get(id=id_pedi)
        return pedido.COD_PEDI
    except Pedido.DoesNotExist:
        return None