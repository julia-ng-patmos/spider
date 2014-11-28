from requests import Response
from rest_framework import viewsets, permissions
from .models import Palabra, Estado, Idioma, Diccionario, TipoDiccionario
from .serializer import PalabraSerializer, EstadoSerializer, IdiomaSerializer, otherSerializer, DiccionarioSerializer, TipoDiccionarioSerializer

# Create your views here.

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
        else:
            queryset = None
        if queryset == None:
            return Response('Page not found')
        else:
            serializer = otherSerializer(queryset, many=True)
            return Response(serializer.data)
