# api/models/proveedor_model.py

from django.db import models

class Proveedor(models.Model):

    id = models.AutoField(primary_key=True)
    COD_PROV = models.CharField(max_length=15, null=True, blank=True)
    NOM_PROV = models.CharField(max_length=20, unique=True)
    EMAIL_PROV = models.CharField(max_length=60, unique=True)
    TEL_PROV = models.CharField(max_length=40, null=True, blank=True)
    NIT_PROV = models.CharField(max_length=40, null=True, blank=True)
    EST_PROV = models.BooleanField(default=True)

    class Meta:
        db_table = "proveedores"
        managed = False  