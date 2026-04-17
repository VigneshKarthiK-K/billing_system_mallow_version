from .constants import Initial_products
from .models import Product

def seed_products():
    existing_product_ids = set(
        Product.objects.values_list("product_id", flat=True)
    )

    products_to_create = []

    for p in Initial_products:
        product_id = str(p["product_id"])

        if product_id not in existing_product_ids:
            products_to_create.append(
                Product(
                    name=p["name"],
                    product_id=p["product_id"],
                    available_stocks=p["available_stocks"],
                    price_per_unit=p["price_per_unit"],
                    tax_percentage=p["tax_percentage"],
                )
            )

    if products_to_create:
        Product.objects.bulk_create(products_to_create, ignore_conflicts=True)
        print(f"{len(products_to_create)} products created")
    else:
        print("Products already seeded")


# class TotalAmountCalculator:

#     def __init__(self, products_and_quantities):
#         self.products_and_quantities = products_and_quantities

#     def tax_calculator(self, amount, tax_percent):
#         tax = amount * (tax_percent/100)
#         return tax

#     def calculateQuantityAmountAndTax(self, product, quantity):
#         print('product.price_per_unit', product.price_per_unit, quantity)
#         amount = product.price_per_unit * quantity
#         tax = self.tax_calculator(amount, product.tax_percentage)
#         return amount + tax

#     def calculate(self):
#         total_amount = 0
#         for pq in self.products_and_quantities:
#             product_id = pq.get('product_id', False)
#             quantity = pq.get('quantity', False)
#             print('product_id', product_id)
#             print('quantity', quantity)
#             if product_id and quantity:
#                 product_id = int(product_id)
#                 quantity = int(quantity)
#                 product = Product.objects.get(product_id=product_id)
#                 print('product', product)
#                 full_amount = self.calculateQuantityAmountAndTax(product, quantity)
#                 total_amount += full_amount
    
#         return total_amount
    