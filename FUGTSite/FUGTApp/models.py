from django.db import models


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


class ReservationAnonyme(models.Model):
    idreservationanonyme = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    email = models.EmailField()
    activite = models.ForeignKey(Activite, on_delete=models.CASCADE, to_field='idactivite')

    def __str__(self):
        return f"Réservation Anonyme - {self.nom} pour {self.activite.nom}"