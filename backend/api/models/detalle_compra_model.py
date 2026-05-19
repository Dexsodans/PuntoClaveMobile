
from django.db import models
from api.models.compra_model import Compra
from api.models.producto import Producto


class DetalleCompra(models.Model):
    COD_DET_COM = models.CharField(max_length=20, null=True, blank=True)
    CANT_DET_COM = models.IntegerField(null=True, blank=True)
    SUB_TOTAL_DET_COM = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    id_com = models.ForeignKey(Compra, on_delete=models.CASCADE, db_column="id_com", null=True)
    id_prod = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column="id_prod", null=True)

    class Meta:
        db_table = "detalle_compras"



