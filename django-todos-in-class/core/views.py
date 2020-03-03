from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse

from .models import Todo, Tag, User, Priority
from .forms import TodoForm

@login_required
def todos_list(request):
    todos = Todo.objects.order_by('-created_at')
    priority_todos = get_priority_todos_for_user(request)
    return render(request, 'core/todos_list.html', {"todos": todos, 'priority_todos': priority_todos})

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

def todos_edit(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    if request.method == 'POST':
        form = TodoForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()
            return redirect('todos-detail', pk=todo.pk)
    else:
        form = TodoForm(instance=todo)
    
    return render(request, 'core/todos_edit.html', {"form": form})

def todos_delete(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    todo.delete()
    return redirect('todos-list')

def todos_by_tag(request, slug):
    tag = Tag.objects.get(slug=slug)
    todos_for_tag=Todo.objects.filter(tag=tag)
    return render(request, 'core/todos_by_tag.html', {'todos':todos_for_tag, 'tag': tag })

def get_priority_todos_for_user(request):
    user = User.objects.get(username=request.user.username)
    priority_todos = [priority.todo for priority in user.priorities.all()]
    return priority_todos
