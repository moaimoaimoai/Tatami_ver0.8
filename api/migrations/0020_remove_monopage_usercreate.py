# Generated by Django 3.2 on 2023-06-26 08:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_affiliatelinks_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='monopage',
            name='userCreate',
        ),
    ]
