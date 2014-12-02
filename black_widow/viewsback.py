from django.shortcuts import _get_queryset
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from .models import Palabra, Estado, Idioma, Diccionario, TipoDiccionario, DefinicionPalabra, Usuario
from .serializer import PalabraSerializer, EstadoSerializer, IdiomaSerializer, otherSerializer, DiccionarioSerializer, TipoDiccionarioSerializer, DefinicionPalabraSerializer, UsuarioSerializer, DefinicionPalabraOfSerializer

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PalabrasViewSet(viewsets.ModelViewSet):
    queryset = Palabra.objects.all()
    serializer_class = PalabraSerializer

class DiccionarioViewSet(viewsets.ModelViewSet):
    queryset = Diccionario.objects.all()
    serializer_class = DiccionarioSerializer

class TipoDiccionarioViewSet(viewsets.ModelViewSet):
    queryset = TipoDiccionario.objects.all()
    serializer_class = TipoDiccionarioSerializer

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class IdiomaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Idioma.objects.all()
    serializer_class = IdiomaSerializer
    permission_classes = (permissions.IsAuthenticated,)

class DefinicionViewSet(viewsets.ModelViewSet):
    queryset = DefinicionPalabra.objects.all()
    serializer_class = DefinicionPalabraSerializer

class DefinicionPalabraOfViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        queryset = DefinicionPalabra.objects.filter(palabra=pk)
        serializer = DefinicionPalabraOfSerializer(queryset, many=True)
        return Response(serializer.data)


class PalabrasFilterContainViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None, pk1=None):
        global queryset
        if pk1 == 'contain':
            queryset = Palabra.objects.filter(nombre__icontains=pk)
        elif pk1 == 'start':
            queryset = Palabra.objects.filter(nombre__istartswith=pk)
        elif pk1 == 'end':
            queryset = Palabra.objects.filter(nombre__iendswith=pk)
        elif pk1 == 'long':
            queryset = Palabra.objects.extra(where={'LENGTH(nombre) =' + pk})
        elif pk1 == 'equal':
            queryset = Palabra.objects.get(nombre__iexact = pk)
        else:
            queryset = None
        if queryset == None:
            return Response('Page not found')
        elif pk1 == 'equal':
            serializer = otherSerializer(queryset)
            return Response(serializer.data)
        else:
            serializer = otherSerializer(queryset, many=True)
            return Response(serializer.data)
