# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Bill
from .serializers import BillSerializer
from .utils import store_bill_details

# Create your views here.
@api_view(['POST'])
def create_bill(request):
    bill_data = request.data

    bill = store_bill_details(bill_data)
    if bill:
        response = {
            'message': f'Bill {bill.id} created successfully',
            'bill_id': bill.id
        }
        return Response(response, status=status.HTTP_201_CREATED)
    else:
        response = {
            'message': 'Something went wrong please try again later',
        }
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def show_bill(request, bill_id):

    try:
        bill = Bill.objects.get(id=bill_id)
    except Bill.DoesNotExist:
        return Response({'error': 'Bill not found'}, status=404)

    bill_json = BillSerializer(bill)

    return Response(bill_json.data)
