# Generated by Django 2.0.7 on 2018-12-30 14:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False, verbose_name='User id')),
                ('first_name', models.CharField(max_length=50, verbose_name='User first name')),
                ('last_name', models.CharField(max_length=50, verbose_name='User last name')),
                ('email', models.EmailField(max_length=160, unique=True, verbose_name='email address')),
                ('nickname', models.CharField(blank=True, default='', max_length=128)),
                ('birthday', models.DateField(null=True, verbose_name='date de naissance')),
                ('phone', models.CharField(blank=True, max_length=15, verbose_name='numéro de téléphone')),
                ('room', models.CharField(blank=True, max_length=128, verbose_name='numéro de chambre')),
                ('address', models.CharField(blank=True, help_text='adresse en dehors de la Meuh', max_length=512)),
                ('city_of_origin', models.CharField(blank=True, help_text="ville d'origine", max_length=128)),
                ('option', models.CharField(blank=True, max_length=128)),
                ('is_ast', models.BooleanField(default=False)),
                ('is_isupfere', models.BooleanField(default=False)),
                ('is_in_gapyear', models.BooleanField(default=False)),
                ('sports', models.CharField(blank=True, max_length=512)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('minesparent', models.ManyToManyField(blank=True, related_name='fillots', to=settings.AUTH_USER_MODEL)),
                ('roommate', models.ManyToManyField(blank=True, related_name='_user_roommate_+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
