# Generated by Django 3.0.3 on 2020-02-27 20:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20200227_2017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='tag',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.Tag'),
        ),
    ]
