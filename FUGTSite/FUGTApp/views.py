
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import ActiviteSerializer

from django.http import FileResponse
from django.conf import settings
import os
from rest_framework.generics import ListCreateAPIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Activite, Vacation
from django.shortcuts import get_object_or_404
from django.shortcuts import render

from rest_framework.decorators import api_view

@method_decorator(csrf_exempt, name='dispatch')
class CreerActiviteView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            activite = Activite.objects.create(
                nom=data.get('nom'),
                lieu=data.get('lieu', ''),
                description=data.get('description', ''),
                date=data.get('date', ''),
            )
            return JsonResponse({'idactivite': activite.idactivite})
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)

class HelloWorldView(APIView):
    def get(self, request):
        message = "Hello, World!"
        return Response({"message": message})


def serve_static_image(request):
    image_path = os.path.join(settings.STATIC_ROOT, 'carte-interactive.jpeg')
    with open(image_path, 'rb') as image_file:
        return FileResponse(image_file)
def get_activite_details(request, idactivite):
    if idactivite is None:
        return JsonResponse({'error': 'ID not provided'}, status=400)

    activite = get_object_or_404(Activite, idactivite=idactivite)
    data = {
        'idactivite': activite.idactivite,
        'nom': activite.nom,
        'lieu': activite.lieu,
        'date': activite.date,
        'description': activite.description,
    }
    return JsonResponse(data)

def get_vacations(request):
    vacations = Vacation.objects.all()
    data = [{
        'idvacation': vacation.idvacation,
        'nom': vacation.nom,
        'lieu': vacation.lieu,
        'date': vacation.date,
        'description': vacation.description,
        'nb_souhait': vacation.nb_souhait,
    } for vacation in vacations]
    return JsonResponse(data, safe=False)

def update_nb_souhait(request, idvacation):
    if idvacation is None:
        return JsonResponse({'error': 'ID not provided'}, status=400)

    vacation = get_object_or_404(Vacation, idvacation=idvacation)
    vacation.nb_souhait += 1
    vacation.save()

    return JsonResponse({'success': True})

class ActiviteListView(ListCreateAPIView):
    queryset = Activite.objects.all()
    serializer_class = ActiviteSerializer
