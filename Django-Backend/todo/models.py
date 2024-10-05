from django.db import models
# from django.contrib.auth.models import User

from user.models import CustomUser


# Create your models here.
# class List(models.Model):
#     name = models.CharField(max_length=100)
#     owner = models.ForeignKey(CustomUser, related_name='lists', on_delete=models.CASCADE, null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name


class Task(models.Model):
    # list = models.ForeignKey(List, related_name='tasks', on_delete=models.CASCADE)
    owner = models.ForeignKey(CustomUser, related_name='tasks', on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=200)
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    # due_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.description

    class Meta:
        ordering = ['created_at']
