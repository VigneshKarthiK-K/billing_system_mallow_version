from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product
from .serializers import ProductSerializer
from .utils import seed_products

# Create your views here.
@api_view(['GET'])
def get_products(request):

    seed_products()

    products = Product.objects.all()

    products_json = ProductSerializer(products, many=True)

    return Response({
        'products': products_json.data,
    })

# @api_view(['POST'])
# def get_total_amount(request):
    
#     products_and_quantities = request.data
#     tac = TotalAmountCalculator(products_and_quantities)
#     total_amount = tac.calculate()


#     return Response({
#         'total_amount': total_amount
#     })