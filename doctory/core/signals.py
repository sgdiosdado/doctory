from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Patient, PatientMore, Medic, MedicMore, User, UserTypes

@receiver(post_save, sender=User)
@receiver(post_save, sender=Medic)
@receiver(post_save, sender=Patient)
def save_more(sender, instance, created, **kwargs):
    if created and UserTypes.PATIENT in instance.type:
        PatientMore.objects.create(user=instance)
    if created and UserTypes.MEDIC in instance.type:
        MedicMore.objects.create(user=instance)