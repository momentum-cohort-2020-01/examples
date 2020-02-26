from django.db import models


class Todo(models.Model):
    item = models.CharField(max_length=80)
    description = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Todo item: {self.item} description: {self.description}"
