
from django.db import models
from api.models.user_model import User


class Compra(models.Model):
    COD_COM = models.CharField(max_length=15, null=True, blank=True)
    FACTURA_COMPRA = models.CharField(max_length=50, null=True, blank=True)
    FECHA_COM = models.DateField(null=True, blank=True)
    TOTAL_COM = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    EST_COM = models.BooleanField(default=True)
    id_admin = models.ForeignKey(User, on_delete=models.CASCADE, db_column="id_admin", null=True)

    class Meta:
        db_table = "compras"

