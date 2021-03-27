from django.db import models
from django.utils import timezone

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()


def standard_response(data=None, errors=None):
    res = {
        'data': data,
        'errors': errors
    }
    return res