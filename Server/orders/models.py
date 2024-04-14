from django.db import models
from customers.models import Customer
from products.models import Product
# Create your models here.

class Order(models.Model):
    order_number = models.CharField(max_length=100, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='customer')
    comments = models.TextField(blank=True)
    creation_date = models.DateTimeField()
    last_update_date = models.DateTimeField(auto_now=True)
    products = models.ManyToManyField(Product, related_name='orders')



    def __str__(self):
        return self.order_number
    


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self): 
        return f"Product '{self.product.prodName}' of order {self.order.order_number}"
    