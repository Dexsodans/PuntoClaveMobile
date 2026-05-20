# api/services/pago_service.py

from api.models import Pago, Pedido
import random, string


def create_pago(id_pedi, metodo, monto):
    """
    Crea un pago para un pedido.
    metodo: 'efectivo' | 'tarjeta' | 'qr'
    """
    try:
        pedido = Pedido.objects.get(id=id_pedi)
    except Pedido.DoesNotExist:
        return None

    codigo = "PAG-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=8))

    pago = Pago.objects.create(
        COD_PAG=codigo,
        id_pedi=pedido,
        METODO_PAG=metodo,
        MONTO_PAG=monto,
        EST_PAG=1,  # 1 = completado (simulado)
    )

    # Marcar pedido como pendiente de entrega
    pedido.EST_PEDI = 1
    pedido.save()

    return pago


def get_pago_by_pedido(id_pedi):
    try:
        pago = Pago.objects.get(id_pedi=id_pedi)
        return {
            "id": pago.id,
            "COD_PAG": pago.COD_PAG,
            "METODO_PAG": pago.METODO_PAG,
            "MONTO_PAG": str(pago.MONTO_PAG),
            "EST_PAG": pago.EST_PAG,
            "FECHA_PAG": pago.FECHA_PAG,
        }
    except Pago.DoesNotExist:
        return None