from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
from django.forms import MultipleChoiceField


class UserTypes(models.TextChoices):
    PATIENT = 'PAT', 'Patient'
    MEDIC = 'MED', 'Medic'


def set_default_user_type():
    return [UserTypes.PATIENT]


class SexTypes(models.TextChoices):
    FEMALE = 'F'
    MALE = 'M'
    OTHER = 'O'
    NOT_SPECIFIED = 'U'


def set_default_sex_type():
    return SexTypes.NOT_SPECIFIED


def user_model(user_type): 
    from .models import Patient, Medic
    types = {
        UserTypes.PATIENT: Patient,
        UserTypes.MEDIC: Medic
    }
    return types[user_type]


def standard_response(data=None, errors=None):
    res = {
        'data': data,
        'errors': errors
    }
    return res


class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()

class ChoiceArrayField(ArrayField):
    """
    A field that allows us to store an array of choices.
    Uses Django's Postgres ArrayField
    and a MultipleChoiceField for its formfield.
    """

    def formfield(self, **kwargs):
        defaults = {
            'form_class': MultipleChoiceField,
            'choices': self.base_field.choices,
            'help_text': 'Use command (control on Windows) to select multiple options.'
        }
        defaults.update(kwargs)
        return super(ArrayField, self).formfield(**defaults)
