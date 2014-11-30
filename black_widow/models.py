from django.db import models
from djorm_pgarray.fields import IntegerArrayField

# Create your models here.
class Telefono(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.CharField(max_length=15)
    usuario_id = models.IntegerField()

    class Meta:
        db_table = 'datos_usuario"."telefono'

class Direccion(models.Model):
    id = models.AutoField(primary_key=True)
    ubicacion = models.CharField(max_length=45)

    class Meta:
        db_table = 'geolocalizacion.direccion'

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    primer_nombre = models.CharField(max_length=45)
    segundo_nombre = models.CharField(max_length=45)
    primer_apellido = models.CharField(max_length=45)
    segundo_apellido = models.CharField(max_length=45)
    fecha_de_nacimiento = models.DateField(auto_now_add=True)
    telefono = models.ForeignKey(Telefono)
    direccion = models.ForeignKey(Direccion)

    class Meta:
        db_table = 'datos_usuario"."usuario'

class Idioma(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(unique=True, max_length=45)

    class Meta:
        db_table = 'geolocalizacion"."idioma'


class Estado(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)

    class Meta:
        db_table = 'contenido_idioma"."estado'


class Palabra(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True)
    idioma = models.ForeignKey('Idioma')
    estado = models.ForeignKey('Estado', default=3)
    objeto_trans = models.TextField()
    id_ascii = IntegerArrayField()

    class Meta:
        db_table = 'contenido_idioma"."palabra'


class TipoDiccionario(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=20)

    class Meta:
        db_table = 'contenido_idioma"."tipo_diccionario'

class Diccionario(models.Model):
    id = models.AutoField(primary_key=True)
    public_name = models.CharField(max_length=30, unique=True)
    private_name = models.CharField(max_length=30)
    date_create = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    estado = models.ForeignKey('Estado', default=3)
    tipo = models.ForeignKey(TipoDiccionario)
    idioma = models.ForeignKey(Idioma)

    class Meta:
        db_table = 'contenido_idioma"."diccionario'

class DefinicionPalabra(models.Model):
    id = models.AutoField(primary_key=True)
    definicion = models.TextField()
    idioma = models.ForeignKey(Idioma)
    palabra = models.ForeignKey(Palabra)
    user_owner = models.ForeignKey(Usuario)
    ascii_id = IntegerArrayField(default={})
    habilitada = models.BooleanField(default=True)
    diccionario = models.ForeignKey(Diccionario, default=6)

    class Meta:
        db_table = 'contenido_idioma"."definicion_palabra'
