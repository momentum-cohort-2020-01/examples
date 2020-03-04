from django.db import models
from django.contrib.auth.models import User


class Cow(models.Model):
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    img_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.name} the {self.breed}'



class Vote(models.Model):
    user = models.ForeignKey(to=User, related_name='votes', on_delete=models.CASCADE)
    cow = models.ForeignKey(to=Cow, related_name='votes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user} voted for {self.cow}'
    