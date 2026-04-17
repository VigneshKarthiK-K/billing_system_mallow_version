from django.urls import path
from .views import create_bill, show_bill

urlpatterns = [
    path('create/', create_bill, name='create-bill'),
    path('show/<int:bill_id>/', show_bill, name='show-bill')
]