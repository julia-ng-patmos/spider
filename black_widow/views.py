from django.shortcuts import render_to_response


# Create your views here.

def index(request):
    return render_to_response('index.html')


def ascii(request):
    return render_to_response('ascii.html')

