# Generated by Django 3.2 on 2021-05-25 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20210525_1802'),
    ]

    operations = [
        migrations.AlterField(
            model_name='allergy',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
