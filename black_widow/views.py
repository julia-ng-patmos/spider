from django.shortcuts import render_to_response, RequestContext


# Create your views here.

def index(request):
    return render_to_response('index.html', RequestContext(request))


def ascii(request):
    return render_to_response('ascii.html')

