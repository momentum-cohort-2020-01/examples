from django.shortcuts import render
import data

# Create your views here.
def todos_list(request):
    todos = data.TODOS
    return render(request, 'core/todos_list.html', {'todos': todos})

def todos_detail(request, pk):
    todo = data.TODOS[str(pk)]
    return render(request, 'core/todos_detail.html', {'todo': todo})