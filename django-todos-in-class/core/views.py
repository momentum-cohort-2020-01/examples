from django.shortcuts import render
from django.http import HttpResponse

from .models import Todo


def todos_list(request):
    todos = Todo.objects.all()
    return render(request, 'core/todos_list.html', {"todos": todos})


def todos_detail(request, pk):
    todo = Todo.objects.get(pk=pk)
    return render(request, 'core/todos_detail.html', {"todo": todo, "pk": pk})
