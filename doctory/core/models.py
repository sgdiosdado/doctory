from django.contrib.auth.models import AbstractUser 
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import OneToOneField
from django.utils import timezone

from .managers import UserManager, PatientManager, MedicManager
from .utils import AutoDateTimeField, ChoiceArrayField, UserTypes, set_default_sex_type, set_default_user_type, SexTypes


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    type = ChoiceArrayField(models.CharField(max_length=50, choices=UserTypes.choices), default=set_default_user_type)
    location = models.CharField(max_length=200, null=True, blank=True)
    sex = models.CharField(max_length=10, choices=SexTypes.choices, default=set_default_sex_type)
    dob = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Patient(User):
    objects = PatientManager()

    class Meta:
        proxy = True
    
    @property
    def more(self):
        return self.patientmore
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = [UserTypes.PATIENT]
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


class PatientMore(models.Model):
    user = OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now, editable=False)
    blood_type = models.CharField(max_length=10, blank=True, null=True)
    alergies = ArrayField(models.CharField(max_length=100, blank=True), blank=True, null=True)
    def __str__(self):
        return self.user.email


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
        return self.user.email


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