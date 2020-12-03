from django.db import models

# Create your models here.
class maturak(models.Model):
    maturak = models.CharField(max_length=50)

class cena(models.Model):
    velikost = models.CharField(max_length=50)
    cena = models.IntegerField()
     


         
