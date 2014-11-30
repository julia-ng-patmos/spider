from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .viewsback import PalabrasViewSet, IdiomaViewSet, EstadoViewSet, PalabrasFilterContainViewSet, DiccionarioViewSet, TipoDiccionarioViewSet, DefinicionViewSet, UsuarioViewSet

usuario_detail = UsuarioViewSet.as_view({
    'get': 'retrieve',
})

palabras_list = PalabrasViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

palabra_filter1 = PalabrasFilterContainViewSet.as_view({
    'get': 'retrieve'
})

idiomas_list = IdiomaViewSet.as_view({
    'get': 'list',
})

estados_list = EstadoViewSet.as_view({
    'get': 'list',
})

palabra_detail = PalabrasViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

idioma_detail = IdiomaViewSet.as_view({
    'get': 'retrieve',
})

estado_detail = EstadoViewSet.as_view({
    'get': 'retrieve',
})

diccionario_list = DiccionarioViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

diccionario_detail = DiccionarioViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

defini_palabra = DefinicionViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

tipo_diccionario_detail = TipoDiccionarioViewSet.as_view({
    'post': 'create',
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns2 = format_suffix_patterns([
    url(r'^usuario/(?P<pk>[0-9]+)/$', usuario_detail, name='usuario-detail'),
    url(r'^palabras/$', palabras_list, name='palabras-list'),
    url(r'^palabra/(?P<pk>[0-9]+)/$', palabra_detail, name='palabra-detail'),
    url(r'^palabras/filterby/(?P<pk1>[a-z]+)/(?P<pk>[a-z-0-9]+)/$', palabra_filter1, name='filter-detail'),
    url(r'^diccionarios/$', diccionario_list, name='diccionario-list'),
    url(r'^diccionario/(?P<pk>[0-9]+)$', diccionario_detail, name='diccionario-detail'),
    url(r'^defpalabra/$', defini_palabra, name='defpalabra-list'),
    url(r'^tipodiccionario/(?P<pk>[0-9]+)/$', tipo_diccionario_detail, name='tipodiccionario-detail'),
    url(r'^idiomas/$', idiomas_list, name='idiomas-list'),
    url(r'^idioma/(?P<pk>[0-9]+)/$', idioma_detail, name='idioma-detail'),
    url(r'^estados/$', estados_list, name='estados-list'),
    url(r'^estado/(?P<pk>[0-9]+)/', estado_detail, name='estado-detail'),
])