from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
class Product(models.Model):
    prodName = models.CharField(validators=[MinLengthValidator(2)], max_length=50, blank=False , unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(
        max_length=4,
        choices=[('raw', 'Raw Material'), ('dish', 'Dish')],
        blank=False,
    )


    def __str__(self):
        return self.prodName
    

