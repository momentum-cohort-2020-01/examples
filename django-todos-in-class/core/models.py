from django.db import models


class Todo(models.Model):
    item = models.CharField(max_length=80)
    description = models.TextField(max_length=300)

    def __str__(self):
        return f"Todo item: {self.item} description: {self.description}"
