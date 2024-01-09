from datetime import datetime

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
# views.py
import logging
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
from .models import Activite, ActiviteReservation, Note, ContactRequest
from django.shortcuts import get_object_or_404, render
from .models import Activite, ActiviteReservation
from .models import Activite, Vacation
from django.shortcuts import get_object_or_404
from django.shortcuts import render

from rest_framework.decorators import api_view, parser_classes

from django.http import JsonResponse
from .models import Activite, ActiviteReservation
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_http_methods
from django.db import models
from django.db.models import F
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Vacation
from .serializers import VacationSerializer
import random


def reservations_par_activite_api(request, id_activite):
    try:
        activite = Activite.objects.get(id=id_activite)
        reservations = ActiviteReservation.objects.filter(id_activite=activite).values('nom', 'prenom')
        data = {'activite': activite.nom, 'reservations': list(reservations)}
        return JsonResponse(data, safe=False)
    except Activite.DoesNotExist:
        return JsonResponse({'error': 'Activité non trouvée'}, status=404)


def get_reservations_by_activite(request, id_activite):
    reservations = ActiviteReservation.objects.filter(id_activite=id_activite)
    data = [{'nom': reservation.nom, 'prenom': reservation.prenom} for reservation in reservations]
    return JsonResponse(data, safe=False)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def creer_activite(request):
    serializer = ActiviteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActiviteListView(ListCreateAPIView):
    queryset = Activite.objects.all()
    serializer_class = ActiviteSerializer


@method_decorator(csrf_exempt, name='dispatch')
class CreerActiviteView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = request.POST  # Utiliser request.POST pour les données du formulaire
            image = request.FILES.get('image')  # Utiliser request.FILES pour les fichiers
            activite = Activite.objects.create(
                nom=data.get('nom'),
                lieu=data.get('lieu', ''),
                description=data.get('description', ''),
                date=data.get('date', ''),
                image=image  # Utiliser directement le fichier image
            )
            activite.image_path = activite.image.url
            activite.save()
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


@csrf_exempt
def reserve_activity(request, activite_id):
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
                activity = Activite.objects.get(id=activite_id)
                # Créez une réservation
                # Reservation.objects.create(user=request.user, activity=activity)
                return JsonResponse({'message': 'Réservation réussie!'})
            except Activite.DoesNotExist:
                return JsonResponse({'error': 'L\'activité n\'existe pas.'}, status=404)
        else:
            return JsonResponse({'error': 'Vous devez être connecté pour réserver une activité.'}, status=401)

    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


def serve_static_image(request):
    image_path = os.path.join(settings.STATIC_ROOT, 'FUGTLogo.png')
    with open(image_path, 'rb') as image_file:
        return FileResponse(image_file)


from django.http import HttpResponse

import logging


@method_decorator(csrf_exempt, name='dispatch')
class add_note_to_activite(View):
    def post(self, request, *args, **kwargs):
        try:
            # Récupérer l'ID de l'activité depuis les paramètres de l'URL
            activity_id = kwargs.get('activity_id')

            if activity_id is None:
                # Gérer l'absence de l'ID de l'activité dans les paramètres de l'URL
                return JsonResponse({'error': 'ID de l\'activité manquant dans les paramètres de l\'URL'}, status=400)

            # Charger les données JSON de la requête
            data = json.loads(request.body)

            # Générer un ID unique
            random_id = str(random.randint(1, 100000))

            # Convertir l'ID de l'activité en entier
            id_activite = int(activity_id)

            # Créer une note avec les données fournies
            note = Note.objects.create(
                id=random_id,
                note=data.get('note', ''),
                id_activite=id_activite
            )

            # Retourner la réponse avec l'ID de la note créée
            return JsonResponse({'id': note.id})

        except Exception as e:
            # Gérer les erreurs et renvoyer une réponse d'erreur
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)


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
        'image_path':activite.image_path
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


@require_POST
def valider_vacations(request):
    if request.method == 'POST':
        selected_vacations = request.POST.getlist('selectedVacations[]')

        # Mettez en œuvre la logique de mise à jour de nb_souhait ici
        # Par exemple, en utilisant la méthode .filter et .update sur le modèle Vacation

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Méthode non autorisée'}, status=405)


@method_decorator(csrf_exempt, name='dispatch')
class ValiderVacationsView(View):
    @csrf_exempt  # Ajoutez également cette ligne
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            data = request.POST.getlist('selectedVacations[]')
            # Utilisez update pour mettre à jour la valeur de nb_souhait
            Vacation.objects.filter(idvacation__in=data).update(nb_souhait=models.F('nb_souhait') + 1)
            return JsonResponse({'message': 'Mise à jour réussie'})
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)


@api_view(['GET'])
def activite_list(request):
    # Obtenez tous les objets Activite
    queryset = Activite.objects.all()

    # Récupérez les paramètres de la requête
    nom = request.query_params.get('nom')
    lieu = request.query_params.get('lieu')
    date = request.query_params.get('date')

    # Ajoutez des logs de débogage pour vérifier les paramètres de requête
    print(f"nom: {nom}, lieu: {lieu}, date: {date}")

    # Appliquez les filtres
    if nom:
        queryset = queryset.filter(nom__icontains=nom)
    if lieu:
        queryset = queryset.filter(lieu__icontains=lieu)
    if date:
        # Convertissez la date au format requis
        date = datetime.strptime(date, '%Y-%m-%d').date()
        queryset = queryset.filter(date=date)

    # Sérialisez les objets filtrés et renvoyez la réponse
    serializer = ActiviteSerializer(queryset, many=True)
    return Response(serializer.data)


class VacationListCreateView(generics.ListCreateAPIView):
    queryset = Vacation.objects.all()
    serializer_class = VacationSerializer


from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        try:
            random_id = str(random.randint(1, 100000))

            # Convertir l'ID de l'activité en entier

            data = json.loads(request.body)
            subject = data.get('subject', '')
            from_email = data.get('from_email', '')
            message = data.get('message', '')

            print('Received data:', data)

            # Enregistrez les données dans la base de données
            contact_request = ContactRequest.objects.create(
                idcontactrequest=random_id,
                subject=subject,
                from_email=from_email,
                message=message
            )

            # Envoyez également l'e-mail si nécessaire
            to_email = ['findurgrouptrip@gmail.com']
            send_mail(subject, f"Demande envoyée par : {from_email}\n\n{message}", from_email, to_email)

            return JsonResponse({'success': True})
        except json.JSONDecodeError as e:
            print('JSON Decode Error:', e)
            return JsonResponse({'success': False, 'error': f'Invalid JSON format: {str(e)}'})
        except Exception as e:
            print('Exception:', e)
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def contact_requests_api(request):
    contact_requests = ContactRequest.objects.all()
    data = [{'idcontactrequest': req.idcontactrequest, 'subject': req.subject, 'from_email': req.from_email, 'message': req.message} for req in contact_requests]
    return JsonResponse(data, safe=False)