from django.db import models
from django.contrib.auth.models import User
from api.models.cliente_model import Cliente
from api.models.producto import Producto

class Ubicacion(models.Model):
    COD_UBI = models.CharField(max_length=15, null=True, blank=True)
    LATITUD_UBI = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    LONGITUD_UBI = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    DIRECCION_UBI = models.CharField(max_length=255, null=True, blank=True)
    EST_UBI = models.BooleanField(default=True)


    class Meta:
        db_table = "ubicaciones"

""" Schema::create('ubicaciones', function (Blueprint $table) {
            $table->id();
            $table->string('COD_UBI',15)->nullable();
            $table->decimal('LATITUD_UBI', 10, 7)->nullable();
            $table->decimal('LONGITUD_UBI', 10, 7)->nullable();
            $table->string('DIRECCION_UBI', 255)->nullable();
            $table->boolean('EST_UBI')->default(true);
            $table->timestamps();
        }); """