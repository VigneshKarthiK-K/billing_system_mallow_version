from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR

from .utils import create_visitor_record

# Create your views here.
@api_view(['POST'])
def register_visitor(request):
    visitor_details = request.data
    visitor = create_visitor_record(visitor_details)
    if visitor:
        response = {'message': f'visitor {visitor.name} registered'}
        return Response(response, status=HTTP_201_CREATED)
    else:
        response = {'message': f'Something went wrong please try again later'}
        return Response(response, status=HTTP_500_INTERNAL_SERVER_ERROR)
