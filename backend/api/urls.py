# api/urls.py

from django.urls import path, include
from api.views.auth_view import LoginView
from api.views.auth_view import RegisterView 
from api.views.proveedor_view import ProveedorView, ProveedorDetailView
from api.views.producto_view import ProductoView
from api.views.carrito_view import CarritoView
from django.conf import settings
from django.conf.urls.static import static




urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", RegisterView.as_view()), # 👈 nuevo
    path("proveedores/", ProveedorView.as_view()),
    path("proveedores/<int:id>/", ProveedorDetailView.as_view()),
    path("productos/", ProductoView.as_view()),
    path("carrito/", CarritoView.as_view()),

]

