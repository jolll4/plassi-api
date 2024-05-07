from rest_framework.views import View
from rest_framework.response import Response
from django.http import *
from .src.create_seating_order import create_seating_order
# import sys

# sys.path.insert(0, './src')

class Message(View):
    def get(self, request):
        return JsonResponse({"message": "Ai tää toimii vai"})


class SeatPeople(View):
    def get(self, request):
        inputData = request
        return JsonResponse()

class SeatPeopleCsv(View):
    def post(self, request):
        return JsonResponse(create_seating_order(request.body), safe=False)