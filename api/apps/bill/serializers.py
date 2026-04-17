from rest_framework import serializers
from .models import Bill, BillItem
from apps.product.serializers import ProductBasicSerializer

class BillItemSerializer(serializers.ModelSerializer):
    product = ProductBasicSerializer(read_only=True)
    class Meta:
        model = BillItem
        fields = [
            # 'id',
            'product',
            'quantity',
            'product_bill_amount',
            'tax_amount',
            'total_amount'
        ]

class BillSerializer(serializers.ModelSerializer):
    items = BillItemSerializer(many=True)

    class Meta:
        model = Bill
        fields = [
            'id',
            'customer_email',
            'payment_method',
            'items',
            'total_without_tax',
            'total_tax',
            'net_price',
            'created_at'
        ]

    # def create(self, validated_data):
    #     items_data = validated_data.pop('items')
    #     bill = Bill.objects.create(**validated_data)

    #     for item in items_data:
    #         BillItem.objects.create(bill=bill, **item)

    #     return bill