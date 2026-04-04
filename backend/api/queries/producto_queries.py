from api.models.producto import Producto

def get_productos_activos():
    return Producto.objects.filter(EST_PRO=True)