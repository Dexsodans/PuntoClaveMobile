# api/models/user_model.py

from django.db import models

class User(models.Model):

    id = models.BigAutoField(primary_key=True)
    COD_USU = models.CharField(max_length=15, null=True)
    name = models.CharField(max_length=255)
    NOM_2_USU = models.CharField(max_length=100, null=True)
    AP_PAT_USU = models.CharField(max_length=100)
    AP_MAT_USU = models.CharField(max_length=100)
    CEL_USU = models.CharField(max_length=20, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    EST_USU = models.BooleanField(default=True)
    AVATAR_USU = models.CharField(max_length=200, null=True)
    role_id = models.IntegerField(null=True)

    class Meta:
        db_table = "users"