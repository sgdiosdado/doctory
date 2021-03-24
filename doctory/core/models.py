from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.fields.related import OneToOneField

from .constants import UserTypes, BackgroundTypes, BackgroundSubtypes


def set_default_user_type():
    return [UserTypes.PACIENT]


class User(AbstractUser):

    type = ArrayField(models.CharField(max_length=50, choices=UserTypes.choices), default=set_default_user_type)

    def __str__(self):
        return self.username


class PacientManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type__contains=[UserTypes.PACIENT])


class MedicManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type__contains=[UserTypes.MEDIC])


class Pacient(User):
    objects = PacientManager()

    class Meta:
        proxy = True
    
    @property
    def more(self):
        return self.pacientmore
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = [UserTypes.PACIENT]
        return super().save(*args, **kwargs)


class Medic(User):
    objects = MedicManager()

    class Meta:
        proxy = True

    @property
    def more(self):
        return self.medicmore

    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = [UserTypes.MEDIC]
        return super().save(*args, **kwargs)


class PacientMore(models.Model):
    user = OneToOneField(User, on_delete=models.CASCADE)


class MedicMore(models.Model):
    user = OneToOneField(User, on_delete=models.CASCADE)
    license = models.CharField(max_length=20, blank=True, null=True)


class Condition(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    background_type = models.CharField(max_length=50, choices=BackgroundTypes.choices)
    background_subtype = models.CharField(max_length=50, choices=BackgroundSubtypes.choices)