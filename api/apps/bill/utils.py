from django.db import transaction
from .models import Bill, BillItem
from apps.product.models import Product

def store_bill_details(bill_data):

    with transaction.atomic():
        email = bill_data['email']
        products_and_quantities = bill_data['products_and_quantities']
        payment_method = bill_data['payment_method']
        bill = Bill.objects.create(
            customer_email=email,
            payment_method=payment_method
        )

        for item in products_and_quantities:
            product_id = int(item['product_id'])
            quantity = int(item['quantity'])
            product = Product.objects.get(product_id=product_id)
            product_bill_amount = product.price_per_unit * quantity

            BillItem.objects.create(
                bill = bill,
                product = product,
                quantity = quantity,
                product_bill_amount = product_bill_amount
            )

            product.available_stocks -= quantity
            product.save()
        
        print('Bill created successfully', bill.id)
        
        return bill
    return False