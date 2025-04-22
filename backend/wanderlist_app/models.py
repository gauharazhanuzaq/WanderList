from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class PlaceManager(models.Manager):
    def visited(self):
        return self.filter(is_visited=True)

    def unvisited(self):
        return self.filter(is_visited=False)


class Place(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    image = models.ImageField(upload_to='places/', null=True, blank=True)
    is_visited = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    objects = PlaceManager()


class Review(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} on {self.place.title}"
