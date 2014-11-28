from rest_framework import serializers
from .models import Palabra, Estado, Idioma, Diccionario, TipoDiccionario


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
        fields = ('url', 'id', 'nombre', 'idioma', 'estado', 'objeto_trans')

class DiccionarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Diccionario
        fields = ('url','id','public_name','private_name','date_create','description','estado','tipo','idioma')

class TipoDiccionarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TipoDiccionario
        fields = ('id', 'name')

class otherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Palabra
        fields = ('id', 'nombre', 'objeto_trans')