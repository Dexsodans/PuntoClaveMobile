from django.db import models

class Producto(models.Model):
    COD_PRO = models.CharField(max_length=15, null=True, blank=True)
    NOM_PRO = models.CharField(max_length=200)
    PRECIO_COMPRA_PRO = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    PRECIO_VENTA_PRO = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    PRECIO_VENTA_UNIDAD_PRO = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    DESC_PRO = models.CharField(max_length=200, null=True, blank=True)
    EST_PRO = models.BooleanField(default=True)
    id_prov = models.BigIntegerField()
    IMAGEN_PRO = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        db_table = "productos"
    
