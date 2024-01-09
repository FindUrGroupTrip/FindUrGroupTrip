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
    image = models.ImageField(upload_to='activite_images/', blank=True, null=True)
    image_path =models.CharField(max_length=200, blank=True, null=True)
    @property
    def average_rating(self):
        return Note.objects.filter(id_activite=self.id).aggregate(models.Avg('note'))['note__avg'] or 0
    @property
    def number_of_notes(self):
        return Note.objects.filter(id_activite=self.id).count()
    class Meta:
        managed = False
        db_table = 'activite'

class Note(models.Model):
    id = models.AutoField(primary_key=True)
    note = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    id_activite = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'note'

class ActiviteReservation(models.Model):
    id = models.CharField(primary_key=True,   max_length=200)
    nom = models.CharField(max_length=45)
    prenom = models.CharField(max_length=45)
    id_activite = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'activite_reservation'

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

class ContactRequest(models.Model):
    idcontactrequest = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=255)
    from_email = models.CharField(max_length=255)
    message = models.CharField(max_length=255)
    def __str__(self):
        return f'{self.subject} - {self.from_email}'
    class Meta:
        managed = False
        db_table = 'contactrequest'