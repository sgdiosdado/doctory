# Generated by Django 3.1.7 on 2021-03-29 18:53

import core.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20210329_1738'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type',
            field=core.utils.ChoiceArrayField(base_field=models.CharField(choices=[('PAT', 'Patient'), ('MED', 'Medic')], max_length=50), default=core.utils.set_default_user_type, size=None),
        ),
    ]
