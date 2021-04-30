from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token

from .models import Patient, PatientMore, Medic, MedicMore, User, UserTypes

@receiver(post_save, sender=User)
@receiver(post_save, sender=Medic)
@receiver(post_save, sender=Patient)
def save_new_more(sender, instance, created, **kwargs):
    if not created:
        types = {
            UserTypes.PATIENT: PatientMore,
            UserTypes.MEDIC: MedicMore
        }
        for t in instance.type:
            try:
                types[t].objects.get(user=instance)
            except ObjectDoesNotExist:
                types[t].objects.create(user=instance)
        return

    if UserTypes.PATIENT in instance.type:
        PatientMore.objects.create(user=instance)
    if UserTypes.MEDIC in instance.type:
        MedicMore.objects.create(user=instance)


@receiver(post_save, sender=User)
@receiver(post_save, sender=Medic)
@receiver(post_save, sender=Patient)
def create_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(pre_save, sender=User)
def update_token(sender, instance, **kwargs):
    if instance:
        new_password = instance.password
        old_password = User.objects.get(pk=instance.pk).password

        if new_password != old_password:
            Token.objects.get(user=instance).delete()
            Token.objects.create(user=instance)
