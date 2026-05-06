from django.db import models
from django.contrib.auth.models import User
from api.models.pedido_model import Pedido
from api.models.producto import Producto

class DetallePedido(models.Model):
    COD_DET_PEDI = models.CharField(max_length=15, null=True, blank=True)
    id_pedi = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column="id_pedi", null=True)
    id_pro = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column="id_pro", null=True)
    CANT_DET_PEDI = models.IntegerField(null=True, blank=True)
    SUB_TOTAL_DET_PEDI = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    EST_DET_PEDI = models.BooleanField(default=True)

    class Meta:
        db_table = "detalle_pedidos"

