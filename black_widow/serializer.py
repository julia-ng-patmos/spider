from rest_framework import serializers
from .models import Palabra, Estado, Idioma, Diccionario, TipoDiccionario, DefinicionPalabra, Usuario

class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id','primer_nombre','segundo_nombre','primer_apellido','segundo_apellido','fecha_de_nacimiento','telefono','direccion',)

class IdiomaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Idioma
        fields = ('id', 'nombre',)

class EstadoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Estado
        fields = ('id', 'nombre',)

class PalabraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Palabra
        fields = ('url', 'id', 'nombre', 'idioma', 'estado', 'objeto_trans', 'id_ascii')

class DiccionarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Diccionario
        fields = ('url','id','public_name','private_name','date_create','description','estado','tipo','idioma')

class DefinicionPalabraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DefinicionPalabra
        fields = ('id','definicion','idioma','palabra','user_owner','ascii_id','habilitada','diccionario',)

class DefinicionPalabraOfSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefinicionPalabra
        fields = ('id','definicion','diccionario',)

class TipoDiccionarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TipoDiccionario
        fields = ('id', 'name')

class otherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Palabra
        fields = ('id', 'nombre', 'objeto_trans',)