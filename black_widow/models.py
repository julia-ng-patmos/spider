from django.db import models

# Create your models here.

class Idioma(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(unique=True, max_length=45)

    class Meta:
        db_table = 'geolocalizacion"."idioma'


class Estado(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=45)

    class Meta:
        db_table = 'contenido_idioma"."estado'


class Palabra(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True)
    idioma = models.ForeignKey('Idioma')
    estado = models.ForeignKey('Estado', default=3)
    objeto_trans = models.TextField()

    class Meta:
        db_table = 'contenido_idioma"."palabra'