# Generated by Django 3.2 on 2021-05-18 00:17

import core.utils
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('type', core.utils.ChoiceArrayField(base_field=models.CharField(choices=[('PAT', 'Patient'), ('MED', 'Medic')], max_length=50), default=core.utils.set_default_user_type, size=None)),
                ('location', models.CharField(blank=True, max_length=200, null=True)),
                ('sex', models.CharField(choices=[('F', 'Female'), ('M', 'Male'), ('O', 'Other'), ('U', 'Not Specified')], default=core.utils.set_default_sex_type, max_length=10)),
                ('dob', models.DateField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', core.utils.AutoDateTimeField(default=django.utils.timezone.now, editable=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='BackgroundType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', core.utils.AutoDateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='Specialty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', core.utils.AutoDateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.user')),
                ('blood_type', models.CharField(blank=True, max_length=10, null=True)),
                ('allergies', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=100), blank=True, null=True, size=None)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('core.user',),
        ),
        migrations.CreateModel(
            name='BackgroundSubtype',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', core.utils.AutoDateTimeField(default=django.utils.timezone.now, editable=False)),
                ('background_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='background_subtypes', to='core.backgroundtype')),
            ],
        ),
        migrations.CreateModel(
            name='Medic',
            fields=[
                ('patient_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.patient')),
                ('license', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('core.patient',),
        ),
        migrations.CreateModel(
            name='Condition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('date_of_diagnosis', models.DateField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', core.utils.AutoDateTimeField(default=django.utils.timezone.now, editable=False)),
                ('background_subtype', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.backgroundsubtype')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conditions', to='core.patient')),
            ],
        ),
        migrations.CreateModel(
            name='PatientMedic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to='core.patient')),
                ('medic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medic', to='core.medic')),
            ],
        ),
        migrations.CreateModel(
            name='MedicSpecialty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.specialty')),
                ('medic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.medic')),
            ],
        ),
        migrations.AddField(
            model_name='medic',
            name='patients',
            field=models.ManyToManyField(related_name='medics', through='core.PatientMedic', to='core.Patient'),
        ),
        migrations.AddField(
            model_name='medic',
            name='specialties',
            field=models.ManyToManyField(related_name='medics', through='core.MedicSpecialty', to='core.Specialty'),
        ),
    ]
