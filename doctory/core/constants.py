from django.db import models

class UserTypes(models.TextChoices):
    PACIENT = 'PAC', 'Pacient'
    MEDIC = 'MED', 'Medic'


class BackgroundTypes(models.TextChoices):
    INHERITED = 'INH', 'Inherited'
    PATHOLOGIC = 'PAT', 'Pathologic'
    ANDROGYNE = 'ANG', 'Andrological and Gyneco-obstetric'
    NOPATHOLOGIC = 'NOP', 'No pathologic'


class BackgroundSubtypes(models.TextChoices):
    INFECTIOUS = 'INF', 'Infectious contagious'
    CHRONIC = 'CHR', 'Chronic degenerative'
    TRAUMA = 'TRAU', 'Traumatological'
    ALLERGY = 'ALL', 'Allergy'
    SURGERY = 'SUR', 'Surgical'
    HOSPITAL = 'HOS', 'Hospitalization'
    TRANSFUSION = 'TRAN', 'Transfusion'
    ADDICTION = 'ADD', 'Addiction'

    GENERAL = 'GEN', 'General'
    ANDROLOGICAL = 'AND', 'Andrological'
    GYNECOOBS = 'GYN', 'Gyneco-obstetric'

    PLACE = 'PLA', 'Living place'
    HYGIENE = 'HYG', 'Hygiene'
    DIET = 'DIE', 'Diet'
    ZOONOSIS = 'ZOO', 'Zoonosis'

