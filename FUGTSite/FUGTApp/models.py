from django.db import models
from django.shortcuts import get_object_or_404

# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=100)
    image_file = models.ImageField(upload_to='images/')
    description = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


class Activite(models.Model):
    idactivite = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=45)
    lieu = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)
    date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'activite'

#class Vacation(models.Model):
#    name = models.CharField(max_length=100)

class Vacation(models.Model):
    idvacation = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=45)
    lieu = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    nb_souhait = models.IntegerField(default=0)

    class Meta:
        managed = False
        db_table = 'vacation'
