from django.shortcuts import render
from django.urls import reverse

from .models import User, Vote

def index(request):
    cows = Cow.objects.all()
    return render(request, "core/cows_list.html")




