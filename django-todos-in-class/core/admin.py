from django.contrib import admin

from .models import Todo, Tag, Priority

admin.site.register(Todo)
admin.site.register(Tag)
admin.site.register(Priority)
