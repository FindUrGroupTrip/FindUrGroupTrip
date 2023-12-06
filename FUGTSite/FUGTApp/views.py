
from rest_framework.views import APIView
from rest_framework.response import Response
# views.py

from .serializers import ActiviteSerializer
from django.http import FileResponse, HttpResponse
from django.conf import settings
import os
from rest_framework.generics import ListCreateAPIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Activite ,ActiviteReservation
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User

from rest_framework import generics
from .models import Vacation
from .serializers import VacationSerializer

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
            return JsonResponse({'idactivite': activite.id})
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)
import random
import uuid  # Import the uuid module

@method_decorator(csrf_exempt, name='dispatch')
class CreerActiviteReservation(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)

            # Attempt to generate a unique ID up to 100 times
            for _ in range(100):
                random_id = random.randint(1, 100000)

                # Check if the generated ID already exists
                if not ActiviteReservation.objects.filter(id=str(random_id)).exists():
                    # Use the generated identifier when creating the ActiviteReservation instance
                    activitereservation = ActiviteReservation.objects.create(
                        id=str(random_id),
                        nom=data.get('nom', ''),
                        prenom=data.get('prenom', ''),
                        id_activite=data.get('id_activite', '')
                    )

                    return JsonResponse({'id': activitereservation.id})

            # If no unique ID is found after 100 attempts, handle the error
            raise Exception('Failed to generate a unique ID within 100 attempts')
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)




class HelloWorldView(APIView):
    def get(self, request):
        message = "Hello, World!"
        return Response({"message": message})

from django.contrib.auth.decorators import login_required

from django.http import HttpResponse



from django.http import HttpResponse

@csrf_exempt
def reserve_activity(request, activity_id):
    if request.method == 'OPTIONS':
        response = HttpResponse(status=204)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-csrftoken'
        return response
    if request.method == 'POST':
        # Vérifiez si l'utilisateur est connecté
        if request.user.is_authenticated:
            try:
                # Vérifiez si l'activité existe
                activity = Activite.objects.get(id=activity_id)
                # Créez une réservation
               # Reservation.objects.create(user=request.user, activity=activity)
                return JsonResponse({'message': 'Réservation réussie!'})
            except Activite.DoesNotExist:
                return JsonResponse({'error': 'L\'activité n\'existe pas.'}, status=404)
        else:
            return JsonResponse({'error': 'Vous devez être connecté pour réserver une activité.'}, status=401)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


def register_view(request):
    if request.method == 'OPTIONS':
        # Répondez à la requête OPTIONS avec les en-têtes CORS appropriés
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-csrftoken'
        return response

    elif request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Vérifier si le nom d'utilisateur existe déjà
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Ce nom d\'utilisateur existe déjà.'}, status=400)

        return JsonResponse({'success': 'Inscription réussie!'})

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

def serve_static_image(request):
    image_path = os.path.join(settings.STATIC_ROOT, 'FUGTLogo.png')
    with open(image_path, 'rb') as image_file:
        return FileResponse(image_file)
def get_activite_details(request, id):
    if id is None:
        return JsonResponse({'error': 'ID not provided'}, status=400)

    activite = get_object_or_404(Activite, id=id)
    data = {
        'idactivite': activite.id,
        'nom': activite.nom,
        'lieu': activite.lieu,
        'date': activite.date,
        'description': activite.description,
    }
    return JsonResponse(data)

class ActiviteListView(ListCreateAPIView):
    queryset = Activite.objects.all()
    serializer_class = ActiviteSerializer

class VacationListCreateView(generics.ListCreateAPIView):
    queryset = Vacation.objects.all()
    serializer_class = VacationSerializer
