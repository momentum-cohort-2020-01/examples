from django.contrib import admin

from .models import Cow, Vote

admin.site.register(Cow)
admin.site.register(Vote)
