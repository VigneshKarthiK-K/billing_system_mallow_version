from django.db import transaction

from .models import Visitor

def create_visitor_record(visitor_details):
    with transaction.atomic():
        name = visitor_details['name']
        company = visitor_details['company']
        visitor = Visitor.objects.create(name=name, company=company)
        return visitor
    return False