from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator , validate_email

# Create your models here.
class Customer(models.Model):
    fullName = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False)
    email = models.EmailField(validators=[validate_email])
    phone = models.CharField(max_length=10,
                                    validators=[MinLengthValidator(10)],
                                    blank=False,unique=True )
    def __str__(self):
        return self.fullName
    

