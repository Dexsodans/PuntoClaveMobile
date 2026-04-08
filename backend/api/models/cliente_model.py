from django.db import models
from django.contrib.auth.models import User

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

    class Meta:
        db_table = "clientes"
    

""" $table->id();
            $table->string('COD_CLI', 15)->nullable();
            $table->string('CI_CLI',20)->unique();
            $table->date('FECHA_NAC_CLI')->nullable();
            $table->string('TIPO_CLI', 25)->nullable();
            /* $table->string('TIPO_PAGO_CLI', 50)->nullable(); */
            $table->string('NIT_CLI',40)->nullable();
            $table->boolean('EST_CLI')->default(true);
            $table->unsignedBigInteger('id_usu');
            $table->foreign('id_usu')->references('id')->on('users');

            $table->timestamps(); """