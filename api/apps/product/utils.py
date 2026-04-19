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

