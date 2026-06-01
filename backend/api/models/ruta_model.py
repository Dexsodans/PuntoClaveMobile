from django.db import models


class Ruta(models.Model):
    NOM_RUTA = models.CharField(max_length=100)
    ZONAS_RUTA = models.TextField(null=True, blank=True) # puede ser una descripción o lista
    EST_RUTA = models.BooleanField(default=True)

    class Meta:
        db_table = "rutas"

""" Schema::create('rutas', function (Blueprint $table) {
            $table->id();

            $table->string('NOM_RUTA', 100);
            $table->text('ZONAS_RUTA')->nullable(); // puede ser una descripción o lista
            $table->boolean('EST_RUTA')->default(true);

            $table->timestamps();
        }); """