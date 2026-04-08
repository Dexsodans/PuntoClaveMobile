# api/models/inventario_model.py

from django.db import models

class Inventario(models.Model):

    id = models.AutoField(primary_key=True)
    stock_actual_inv = models.IntegerField(null=True, blank=True)
    stock_min_inv = models.IntegerField(null=True, blank=True)
    stock_max_inv = models.IntegerField(null=True, blank=True)

    id_pro = models.BigIntegerField()

    class Meta:
        db_table = "inventarios"