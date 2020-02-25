from django.shortcuts import render
from django.http import HttpResponse

import data

def todos_list(request):
    todos = data.TODOS
    return render(request, 'core/todos_list.html', {'todos': todos})

def todos_detail(request, pk):
    todo = data.TODOS[str(pk)]
    return render(request, 'core/todos_detail.html', {'todo': todo})