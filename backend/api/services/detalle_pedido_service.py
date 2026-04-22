from api.models.detalle_pedido_model import DetallePedido
from api.models.pedido_model import Pedido
from api.models.producto import Producto
from api.queries.detalle_pedido_queries import *
from rest_framework.response import Response


""" def get_all():
    return Pedido.objects.all().values() """

def create(id_pedi, id_pro, CANT_DET_PEDI, SUB_TOTAL_DET_PEDI):
    #para tener pedido
    pedido = Pedido.objects.filter(id=id_pedi).first()
    if not pedido:
        return Response({
            "success": False,
            "message": "Pedido no encontrado"
        }, status=404)
    #para tener producto
    producto = Producto.objects.filter(id=id_pro).first()
    if not producto:
        return Response({
            "success": False,
            "message": "Producto no encontrado"
        }, status=404)

    last_id = get_last_id()
    id = last_id + 1

    detalle_pedido = DetallePedido(
        COD_DET_PEDI=f"PEDI-{str(id).zfill(5)}",
        id_pedi=pedido,
        id_pro=producto,
        CANT_DET_PEDI=CANT_DET_PEDI,
        SUB_TOTAL_DET_PEDI=SUB_TOTAL_DET_PEDI
    )

    detalle_pedido.save()
    return detalle_pedido

""" def get_for_cliente(id_usu):

    cliente = get_cliente_by_user_id(id_usu)

    if not cliente:
        return None

    pedidos = Pedido.objects.filter(id_cli=cliente.id).values()

    return pedidos """