# api/urls.py

from django.urls import path, include
from api.views.auth_view import LoginView
from api.views.auth_view import RegisterView 
from api.views.proveedor_view import ProveedorView, ProveedorDetailView
from api.views.producto_view import ProductoView
from api.views.carrito_view import CarritoView
from api.views.ubicacion_view import UbicacionView
from api.views.pedido_view import PedidoView
from api.views.detalle_pedido_view import DetallePedidoView
from django.conf import settings
from django.conf.urls.static import static





urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", RegisterView.as_view()), # 👈 nuevo
    path("proveedores/", ProveedorView.as_view()),
    path("proveedores/<int:id>/", ProveedorDetailView.as_view()),
    path("productos/", ProductoView.as_view()),
    path("carrito/", CarritoView.as_view()),
    path("ubicaciones/", UbicacionView.as_view()),
    path("pedidos/", PedidoView.as_view()),
    path("detalle_pedidos/", DetallePedidoView.as_view())
]

