# Generated by Django 3.2 on 2021-04-30 00:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_auto_20210429_2359'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='patient_medic',
        ),
        migrations.AddField(
            model_name='user',
            name='medics',
            field=models.ManyToManyField(related_name='patients', through='core.PatientMedic', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='patientmedic',
            name='medic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medic', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='patientmedic',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to=settings.AUTH_USER_MODEL),
        ),
    ]