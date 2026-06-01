from django.db import models
from api.models.ubicacion_model import Ubicacion
from api.models.ruta_model import Ruta

class RutaUbicacion(models.Model):
    id_ruta = models.ForeignKey(Ruta, on_delete=models.CASCADE, db_column="id_ruta", null=True)
    id_ubi = models.ForeignKey(Ubicacion, on_delete=models.CASCADE, db_column="id_ubi", null=True)
    ORDEN_ENTREGA = models.IntegerField(null=True, blank=True)
    EST_RUTA_UBI = models.BooleanField(default=True)

    class Meta:
        db_table = "rutas_ubicaciones"


