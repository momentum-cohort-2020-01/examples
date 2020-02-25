from django.shortcuts import render
from django.http import HttpResponse

import data

# Create your views here.
def notes_list(request):
    todos = data.TODOS
    return render(request, 'core/todos_list.html', {'todos': todos})