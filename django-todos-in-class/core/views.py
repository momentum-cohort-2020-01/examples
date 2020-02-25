from django.shortcuts import render
from django.http import HttpResponse

import data

# Create your views here.
def index(request):
    todos = data.TODOS
    breakpoint()
    return render(request, 'base.html', {'todos': todos})