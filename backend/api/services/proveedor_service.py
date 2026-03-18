# api/services/proveedor_service.py

from api.models.proveedor_model import Proveedor
import re

def get_all():
    return Proveedor.objects.all().values()

def create(data):

    nombre = data.get("NOM_PROV")
    email = data.get("EMAIL_PROV")

    if not nombre:
        raise Exception("Nombre obligatorio")

    if re.search(r'\d', nombre):
        raise Exception("El nombre no debe tener números")

    if not email.endswith("@gmail.com"):
        raise Exception("Email debe ser @gmail.com")

    if Proveedor.objects.filter(NOM_PROV=nombre).exists():
        raise Exception("Nombre ya existe")

    if Proveedor.objects.filter(EMAIL_PROV=email).exists():
        raise Exception("Email ya existe")

    return Proveedor.objects.create(**data)

def update(id, data):

    proveedor = Proveedor.objects.get(id=id)

    proveedor.NOM_PROV = data.get("NOM_PROV")
    proveedor.EMAIL_PROV = data.get("EMAIL_PROV")
    proveedor.TEL_PROV = data.get("TEL_PROV")
    proveedor.NIT_PROV = data.get("NIT_PROV")

    proveedor.save()
    return proveedor

def delete(id):
    proveedor = Proveedor.objects.get(id=id)
    proveedor.delete()