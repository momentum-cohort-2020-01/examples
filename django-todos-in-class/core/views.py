from django.shortcuts import render, redirect
from django.http import HttpResponse

from .models import Todo
from .forms import TodoForm


def todos_list(request):
    todos = Todo.objects.all()
    return render(request, 'core/todos_list.html', {"todos": todos})


def todos_detail(request, pk):
    todo = Todo.objects.get(pk=pk)
    return render(request, 'core/todos_detail.html', {"todo": todo, "pk": pk})


def todos_new(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            todo = form.save()
            return redirect('todos-detail', pk=todo.pk)
    else:
        form = TodoForm()

    return render(request, 'core/todos_new.html', {"form": form})
