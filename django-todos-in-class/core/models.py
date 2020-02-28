from django.db import models
from django.utils.text import slugify


class Todo(models.Model):
    item = models.CharField(max_length=80)
    description = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tag = models.ForeignKey('Tag', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return f"Todo item: {self.item} description: {self.description}"

class Tag(models.Model):
    name = models.CharField(max_length=40)
    slug = models.SlugField(null=False, unique=True, default=slugify(name))

    def __str__(self):
        return f'{self.name}'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)    
    
