from django.db import models
from apps.product.models import Product

# Create your models here.

class Bill(models.Model):
    customer_email = models.EmailField()
    payment_method = models.CharField(
        max_length=10,
        choices=[('cash', 'Cash'), ('card', 'Card'), ('upi', 'UPI')],
        default='cash'
    )

    total_without_tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def calculate_totals(self):
        total_without_tax = sum(item.product_bill_amount for item in self.items.all())
        total_tax = sum(item.tax_amount for item in self.items.all())
        self.total_without_tax = total_without_tax
        self.total_tax = total_tax
        self.net_price = total_without_tax + total_tax

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # first save to get ID
        self.calculate_totals()
        super().save(update_fields=['total_without_tax', 'total_tax', 'net_price'])

    # customer_paid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    # denomination_amounts = models.JSONField()

    # @property
    # def total_without_tax(self):
    #     return sum(item.product_bill_amount for item in self.items.all())

    # @property
    # def total_tax(self):
    #     return sum(item.tax_amount for item in self.items.all())

    # @property
    # def net_price(self):
    #     return self.total_without_tax + self.total_tax

    def __str__(self):
        return f"Bill {self.id} - {self.customer_email}"

class BillItem(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    product_bill_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def calculate_totals(self):
        self.tax_amount = (self.product_bill_amount * self.product.tax_percentage) / 100
        self.total_amount = self.product_bill_amount + self.tax_amount

    def save(self, *args, **kwargs):
        self.calculate_totals()
        super().save(*args, **kwargs)

        if self.bill:
            self.bill.calculate_totals()
            self.bill.save(update_fields=['total_without_tax', 'total_tax', 'net_price'])

    # @property
    # def tax_amount(self):
    #     return (self.product_bill_amount * self.product.tax_percentage) / 100

    # @property
    # def total_amount(self):
    #     return self.product_bill_amount + self.tax_amount

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
    
