from django.shortcuts import render
from django.urls import reverse

from .models import Cow, User, Vote


def index(request):
    cows = Cow.objects.all()
    return render(request, "core/cows_list.html", {"cows": cows})


def vote(request):
    votes = Cow.objects.all().votes
    return render(request, "core/cows_list.html", {"votes": votes})
