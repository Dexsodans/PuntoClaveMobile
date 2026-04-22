from django.db import models
from django.contrib.auth.models import User
from api.models.cliente_model import Cliente
from api.models.ubicacion_model import Ubicacion

class Pedido(models.Model):
    COD_PEDI = models.CharField(max_length=15, null=True, blank=True)
    id_cli = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column="id_cli", null=True)
    id_ubi = models.ForeignKey(Ubicacion, on_delete=models.CASCADE, db_column="id_ubi", null=True)
    # id_ubi = models.IntegerField(null=True, blank=True)
    FECHA_PEDI = models.DateTimeField(null=True, blank=True)
    TOTAL_PEDI = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    EST_PEDI = models.IntegerField(default=1) # 1 = pendiente, 2 = en camino, 3 = entregado, 4 = cancelado

    class Meta:
        db_table = "pedidos"


"""         Schema::create('pedidos', function (Blueprint $table) {
            $table->id();

            // Clave foránea al cliente
            $table->string('COD_PEDI',15)->nullable();
            $table->unsignedBigInteger('id_cli');
            $table->foreign('id_cli')->references('id')->on('clientes');
            $table->unsignedBigInteger('id_ubi');
            $table->foreign('id_ubi')->references('id')->on('ubicaciones');

            $table->dateTime('FECHA_PEDI');
            $table->decimal('TOTAL_PEDI', 10, 2);
            $table->integer('EST_PEDI')->default(1); // 1 = pendiente, 2 = en camino, 3 = entregado, 4 = cancelado

            $table->timestamps();
        }); """