# Generated by Django 3.1.7 on 2021-03-30 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20210329_1853'),
    ]

    operations = [
        migrations.AlterField(
            model_name='backgroundsubtype',
            name='background_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='background_subtypes', to='core.backgroundtype'),
        ),
    ]
