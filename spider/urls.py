from django.conf.urls import patterns, include, url, static
from black_widow.urlsback import urlpatterns2

from django.contrib import admin
from .settings import FRONTEND_URL

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'spider.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^rest/', include(urlpatterns2)),
                       url(r'^$', 'black_widow.views.index'),
                       url(r'^getdef$', 'black_widow.views.getdef'),

) + static.static('/', document_root=FRONTEND_URL)
