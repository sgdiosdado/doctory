from django.contrib.auth.models import AbstractUser 
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone

from .managers import UserManager
from .utils import AutoDateTimeField, ChoiceArrayField, UserTypes, set_default_sex_type, set_default_user_type, SexTypes


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    type = ChoiceArrayField(models.CharField(max_length=50, choices=UserTypes.choices), default=set_default_user_type)
    sex = models.CharField(max_length=10, choices=SexTypes.choices, default=set_default_sex_type)
    dob = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Specialty(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class Patient(User):
    location = models.CharField(max_length=200, null=True, blank=True)
    blood_type = models.CharField(max_length=10, blank=True, null=True)
    allergies = ArrayField(models.CharField(max_length=100, blank=True), blank=True, null=True)


class Medic(Patient):
    license = models.CharField(max_length=20, blank=True, null=True)
    specialties = models.ManyToManyField(Specialty, through='MedicSpecialty', related_name='medics')
    patients = models.ManyToManyField(Patient, symmetrical=False, through='PatientMedic', related_name='medics')


class PatientMedic(models.Model):
    medic = models.ForeignKey(Medic, on_delete=CASCADE, related_name='medic')
    patient = models.ForeignKey(Patient, on_delete=CASCADE, related_name='patient')


class MedicSpecialty(models.Model):
    medic = models.ForeignKey(Medic, on_delete=models.CASCADE)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)


class BackgroundType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class BackgroundSubtype(models.Model):
    background_type = models.ForeignKey(BackgroundType, on_delete=models.CASCADE, related_name='background_subtypes')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True) 
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class Condition(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='conditions')
    background_subtype = models.ForeignKey(BackgroundSubtype, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date_of_diagnosis = models.DateField()
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name
