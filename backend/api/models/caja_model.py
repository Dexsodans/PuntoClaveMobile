from django.db import models
from api.models.user_model import User
from api.models.ruta_model import Ruta

class Caja(models.Model):
    COD_CAJA = models.CharField(max_length=20, null=True, blank=True)
    id_usu = models.ForeignKey(User, on_delete=models.CASCADE, db_column="id_usu", null=True)
    id_ruta = models.ForeignKey(Ruta, on_delete=models.CASCADE, db_column="id_ruta", null=True)
    FECHA_CREACION_CAJA = models.DateField(null=True, blank=True)
    OBS_CAJA = models.TextField(null=True, blank=True)
    EST_CAJA = models.IntegerField(default=1) # 1 = pendiente, 2 = en camino, 3 = entregado, 4 = cancelado
    EVIDENCIA_CAJA =  models.TextField(max_length=200 ,null=True, blank=True) # puede ser una URL o descripción de la evidencia

    class Meta:
        db_table = "cajas"

