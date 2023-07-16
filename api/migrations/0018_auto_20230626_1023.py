# Generated by Django 3.2 on 2023-06-26 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_friendrequest_deleted'),
    ]

    operations = [
        migrations.RenameField(
            model_name='friendrequest',
            old_name='deleted',
            new_name='deletedByAskFrom',
        ),
        migrations.AddField(
            model_name='friendrequest',
            name='deletedByAskTo',
            field=models.BooleanField(default=False),
        ),
    ]
