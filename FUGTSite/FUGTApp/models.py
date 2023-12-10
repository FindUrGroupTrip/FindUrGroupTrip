import uuid

from django.db import models

# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=100)
    image_file = models.ImageField(upload_to='images/')
    description = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Activite(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=45)
    lieu = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    moyenne_notes = models.FloatField(default=0)
    class Meta:
        managed = False
        db_table = 'activite'


class Note(models.Model):
    note = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])


class ActiviteReservation(models.Model):
    id = models.CharField(primary_key=True,   max_length=200)
    nom = models.CharField(max_length=45)
    prenom = models.CharField(max_length=45)
    id_activite = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'activite_reservation'


