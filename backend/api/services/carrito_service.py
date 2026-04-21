from api.models.carrito_model import Carrito
from api.queries.cliente_queries import get_cliente_by_user_id
from api.queries.producto_queries import get_producto_by_id


def agregar_al_carrito(user_id, producto_id):

    # obtener cliente
    cliente = get_cliente_by_user_id(user_id)

    if not cliente:
        raise Exception("El usuario debe ser cliente")

    # obtener producto
    producto = get_producto_by_id(producto_id)

    if not producto:
        raise Exception("Producto no encontrado")

    cantidad = 1

    precio = producto.PRECIO_VENTA_PRO

    subtotal = precio * cantidad

    carrito = Carrito.objects.create(
        id_cli=cliente,
        id_pro=producto,
        CANT_CAR=cantidad,
        SUB_TOTAL_CAR=subtotal
    )

    return carrito

def get_carrito_by_cliente_id(cliente_id):
    return Carrito.objects.filter(id_cli=cliente_id).select_related("id_pro")