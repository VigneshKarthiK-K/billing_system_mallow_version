from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=200)
    product_id = models.CharField(max_length=100, unique=True, primary_key=True)
    available_stocks = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.product_id})"
    