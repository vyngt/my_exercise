import os
import time

from django.contrib.auth.models import User
from django.db import models


def content_file_name(instance, filename):
    time_str = time.strftime("%Y%m%d-%H%M%S")
    name, extension = os.path.splitext(filename)
    return os.path.join('content', instance.user.username, time_str + extension)


class UserFaceImage(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=content_file_name, blank=False)
