from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse

from .models import Cow, User, Vote

def index(request):
    cows = Cow.objects.all()
    return render(request, "core/cows_list.html", {"cows": cows})

@login_required
def vote(request, cow_pk):
    cow = get_object_or_404(Cow, pk=cow_pk)
    vote = Vote.objects.create(user=request.user, cow=cow)
    breakpoint()
    return redirect('home')




