from rest_framework import serializers
from .models import Palabra, Estado, Idioma


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


class otherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Palabra
        fields = ('id', 'nombre', 'objeto_trans')