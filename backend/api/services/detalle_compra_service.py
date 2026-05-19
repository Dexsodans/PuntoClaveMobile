from api.models.detalle_compra_model import DetalleCompra
from api.models.compra_model import Compra
from api.models.producto import Producto
from api.queries.detalle_compra_queries import *
from rest_framework.response import Response


""" def get_all():
    return Compra.objects.all().values() """

def create(id_com, id_pro, CANT_DET_COMPRA, SUB_TOTAL_DET_COMPRA):
    #para tener compra
    compra = Compra.objects.filter(id=id_com).first()
    if not compra:
        return Response({
            "success": False,
            "message": "Compra no encontrada"
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

    detalleCompra = DetalleCompra(
        COD_DET_COM=f"COD_DET_COM-{str(id).zfill(6)}",
        id_com=compra,
        id_prod=producto,
        CANT_DET_COM=CANT_DET_COMPRA,
        SUB_TOTAL_DET_COM=SUB_TOTAL_DET_COMPRA
    )

    detalleCompra.save()
    return detalleCompra

