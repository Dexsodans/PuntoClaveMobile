from django.db import models
from api.models.user_model import User

class Cliente(models.Model):

    COD_CLI = models.CharField(max_length=15, null=True, blank=True)
    CI_CLI = models.CharField(max_length=20, unique=True)
    FECHA_NAC_CLI = models.DateField(null=True, blank=True)
    TIPO_CLI = models.CharField(max_length=25, null=True, blank=True)
    NIT_CLI = models.CharField(max_length=40, null=True, blank=True)
    EST_CLI = models.BooleanField(default=True)
    id_usu = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    db_column="id_usu"
)
    puntos_cli = models.IntegerField(default=0)

    class Meta:
        db_table = "clientes"
    