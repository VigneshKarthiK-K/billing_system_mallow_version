from django.urls import path
from .views import register_visitor

urlpatterns = [
    path('register/', register_visitor, name='register_visitor'),
]