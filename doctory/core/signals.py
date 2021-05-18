from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token

from .models import User, Patient, Medic

@receiver(post_save, sender=User)
@receiver(post_save, sender=Patient)
@receiver(post_save, sender=Medic)
def create_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(pre_save, sender=User)
@receiver(pre_save, sender=Patient)
@receiver(pre_save, sender=Medic)
def update_token(sender, instance, **kwargs):
    if instance:
        try:
            new_password = instance.password
            old_password = User.objects.get(pk=instance.pk).password

            if new_password != old_password:
                Token.objects.get(user=instance).delete()
                Token.objects.create(user=instance)
        except User.DoesNotExist:
            pass
