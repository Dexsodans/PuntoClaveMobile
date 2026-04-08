from django.db import models
from django.contrib.auth.models import User
from api.models.cliente_model import Cliente
from api.models.producto import Producto

class Carrito(models.Model):
    id_cli = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column="id_cli", null=True)
    id_pro = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column="id_pro", null=True)
    CANT_CAR = models.IntegerField(null=True, blank=True)
    SUB_TOTAL_CAR = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "carritos"

""" Schema::create('carritos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_cli')->nullable();
            $table->foreign('id_cli')->references('id')->on('clientes');
            $table->unsignedBigInteger('id_pro');
            $table->foreign('id_pro')->references('id')->on('productos');
            //datos 
            $table->integer('CANT_CAR')->nullable();
            $table->decimal('SUB_TOTAL_CAR', 10, 2)->nullable();
            $table->timestamps();
        }); """