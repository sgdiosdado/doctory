from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.fields.related import OneToOneField

from .utils import AutoDateTimeField
from django.utils import timezone

class UserTypes(models.TextChoices):
    PACIENT = 'PAC', 'Pacient'
    MEDIC = 'MED', 'Medic'

def set_default_user_type():
    return [UserTypes.PACIENT]


class User(AbstractUser):

    type = ArrayField(models.CharField(max_length=50, choices=UserTypes.choices), default=set_default_user_type)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

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
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.user.username


class Specialty(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class MedicMore(models.Model):
    user = OneToOneField(User, on_delete=models.CASCADE)
    license = models.CharField(max_length=20, blank=True, null=True)
    specialties = models.ManyToManyField(Specialty, through='MedicSpecialty', related_name='medics')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.user.username


class MedicSpecialty(models.Model):
    medic = models.ForeignKey(MedicMore, on_delete=models.CASCADE)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)


class BackgroundType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class BackgroundSubtype(models.Model):
    background_type = models.ForeignKey(BackgroundType, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True) 
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class Condition(models.Model):
    background_subtype = models.ForeignKey(BackgroundSubtype, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date_of_diagnosis = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name