# api/urls.py

from django.urls import path
from api.views.auth_view import LoginView
from api.views.auth_view import RegisterView 
from api.views.proveedor_view import ProveedorView, ProveedorDetailView

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", RegisterView.as_view()), # 👈 nuevo
    path("proveedores/", ProveedorView.as_view()),
    path("proveedores/<int:id>/", ProveedorDetailView.as_view()),
]