from datetime import datetime

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
# views.py
import logging
from .serializers import ActiviteSerializer
from django.http import FileResponse, HttpResponse
import os
from rest_framework.generics import ListCreateAPIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Activite, Note, ContactRequest
from .models import Activite, Question, Answer
from django.shortcuts import render

from rest_framework.decorators import api_view, parser_classes

from .models import Activite, ActiviteReservation
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_http_methods
from django.db import models
from django.db.models import F
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Vacation, Feedbackimage
from .serializers import VacationSerializer, QuestionSerializer, AnswerSerializer
import random
from .models import Whatsappchanel


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
        'image_path': activite.image_path
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


# Forum
class QuestionListView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuestionDetailView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerListView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class AnswerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class AnswerCreateView(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


from django.core.mail import send_mail
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
    data = [{'idcontactrequest': req.idcontactrequest, 'subject': req.subject, 'from_email': req.from_email,
             'message': req.message} for req in contact_requests]
    return JsonResponse(data, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class AddWhatsapp(View):
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

            existing_channel = Whatsappchanel.objects.filter(activiteid=id_activite).first()

            if existing_channel:
                return JsonResponse({'exists': True, 'link': existing_channel.link})

            # Si aucun lien existant n'a été trouvé, créez-en un nouveau
            new_channel = Whatsappchanel.objects.create(
                idwhatsappchanel=str(random_id),
                link=data.get('link'),
                activiteid=id_activite
            )

            return JsonResponse({'created': True, 'idwhatsappchanel': new_channel.idwhatsappchanel})

        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class UpdateWhatsapp(View):
    def put(self, request, *args, **kwargs):
        try:
            activity_id = kwargs.get('activity_id')
            if activity_id is None:
                return JsonResponse({'error': 'ID de l\'activité manquant dans les paramètres de l\'URL'}, status=400)

            data = json.loads(request.body)
            id_activite = int(activity_id)

            # Recherchez le lien WhatsApp existant pour cette activité
            try:
                whatsapp_channel = Whatsappchanel.objects.get(activiteid=id_activite)
            except Whatsappchanel.DoesNotExist:
                return JsonResponse({'error': 'Aucun canal WhatsApp trouvé pour cette activité'}, status=404)

            # Mise à jour du lien WhatsApp
            whatsapp_channel.link = data.get('link')
            whatsapp_channel.save()

            return JsonResponse({'message': 'Canal WhatsApp mis à jour avec succès',
                                 'idwhatsappchanel': whatsapp_channel.idwhatsappchanel})

        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite lors de la mise à jour'}, status=500)


class GetWhatsapp(View):
    def get(self, request, *args, **kwargs):
        id_activite = kwargs.get('idactivite')
        try:
            whatsapp_channel = Whatsappchanel.objects.get(activiteid=id_activite)
            return JsonResponse({'link': whatsapp_channel.link})
        except Whatsappchanel.DoesNotExist:
            return JsonResponse({'error': 'Lien non trouvé'}, status=404)


@method_decorator(csrf_exempt, name='dispatch')
class AddFeedbackimage(View):
    def post(self, request, *args, **kwargs):
        try:
            activity_id = kwargs.get('activity_id')
            if activity_id is None:
                return JsonResponse({'error': 'ID de l\'activité manquant dans les paramètres de l\'URL'}, status=400)

            data = request.POST  # Utiliser request.POST pour les données du formulaire
            image = request.FILES.get('image')
            # Utiliser request.FILES pour les fichiers
            id_activite = int(activity_id)
            random_id = str(random.randint(1, 100000))
            feedback = Feedbackimage.objects.create(
                idfeedbackimage=str(random_id),
                image=image,
                activite_id=id_activite  # Utiliser directement le fichier image
            )
            feedback.image_path = feedback.image.url
            feedback.save()
            return JsonResponse({'idfeedbackimage': feedback.idfeedbackimage})
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Une erreur s\'est produite'}, status=500)


class GetFeedbackimage(View):
    def get(self, request, *args, **kwargs):
        id_activite = kwargs.get('idactivite')
        try:
            feedback_images = Feedbackimage.objects.filter(activite_id=id_activite)
            image_paths = [feedback.image_path for feedback in feedback_images]
            return JsonResponse({'image_paths': image_paths})
        except Feedbackimage.DoesNotExist:
            return JsonResponse({'error': 'Images non trouvées'}, status=404)


# pour nouvelle version to do list
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import UserReservation
from .serializers import UserReservationSerializer, ActiviteSerializer

from rest_framework.response import Response
from rest_framework import status


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, reservation_id):
    try:
        reservation = UserReservation.objects.get(id=reservation_id, user=request.user)
        reservation.is_favorite = not reservation.is_favorite
        reservation.save()
        return Response({'message': 'Favorite status toggled successfully.'}, status=status.HTTP_200_OK)
    except UserReservation.DoesNotExist:
        return Response({'error': 'User reservation not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def activity_options(request):
    activities = Activite.objects.all()
    options = [{'id': activity.id, 'name': activity.nom} for activity in activities]
    return JsonResponse(options, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_reservations(request):
    reservations = UserReservation.objects.filter(user=request.user).select_related('activite')

    # Ajoutez ce point de contrôle pour imprimer les données
    print("Reservations data:", reservations.values())

    serializer = UserReservationSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_user_reservation(request):
    data = request.data
    user = request.user
    activite_id = data.get('activityId')
    is_favorite = data.get('is_favorite', False)

    # Vérifier si l'utilisateur a déjà réservé cette activité
    existing_reservation = UserReservation.objects.filter(user=user, activite_id=activite_id).first()
    if existing_reservation:
        return JsonResponse({'error': 'Vous avez déjà réservé cette activité.'}, status=400)

    # Vérifier si l'activité existe
    try:
        activite = Activite.objects.get(pk=activite_id)
    except Activite.DoesNotExist:
        return JsonResponse({'error': 'L\'activité n\'existe pas.'}, status=404)

    # Créer la réservation
    user_reservation = UserReservation(user=user, activite=activite, is_favorite=is_favorite)
    user_reservation.save()

    serializer = UserReservationSerializer(user_reservation)
    return JsonResponse(serializer.data, status=201)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_user_reservation(request, reservation_id):
    try:
        reservation = UserReservation.objects.get(id=reservation_id, user=request.user)
        reservation.delete()
        return JsonResponse({'success': True})
    except UserReservation.DoesNotExist:
        return JsonResponse({'error': 'La réservation n\'existe pas ou ne vous appartient pas.'}, status=404)


import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.io as pio
import io
from django.conf import settings
from django.http import HttpResponse


def load_medals_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_medals.csv')
    olympic_medals_df = pd.read_csv(csv_path)
    olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    olympic_medals_df['athlete_full_name'] = olympic_medals_df['athlete_full_name'].fillna('No Data')
    olympic_medals_df['participant_title'] = olympic_medals_df['participant_title'].fillna('No Country')
    return olympic_medals_df


def heatmap_medals(request):
    olympic_medals_df = load_medals_data()

    medal_counts_by_country = olympic_medals_df.groupby('country_name')['medal_type'].value_counts().unstack().fillna(0)
    top_20_countries = medal_counts_by_country.sum(axis=1).sort_values(ascending=False).head(20).index
    medal_counts_top20 = medal_counts_by_country.loc[top_20_countries]

    plt.figure(figsize=(10, 6))
    sns.heatmap(medal_counts_top20, annot=True, cmap='YlGnBu', fmt="g")
    plt.title('Répartition des Médailles par Pays et Type de médaille (Top 20)')
    plt.ylabel('Pays')
    plt.xlabel('Type de Médaille')

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    plt.close()
    buffer.seek(0)

    return HttpResponse(buffer.getvalue(), content_type='image/png')


def country_discipline_heatmap(request):
    olympic_medals_df = load_medals_data()

    medals_by_country_discipline = olympic_medals_df.groupby(['country_name', 'discipline_title']).size().reset_index(
        name='medal_count')

    top_countries = medals_by_country_discipline.groupby('country_name')['medal_count'].sum().nlargest(20).index
    medals_top_countries = medals_by_country_discipline[
        medals_by_country_discipline['country_name'].isin(top_countries)]

    top_disciplines = medals_top_countries.groupby('discipline_title')['medal_count'].sum().nlargest(30).index
    medals_top_countries = medals_top_countries[medals_top_countries['discipline_title'].isin(top_disciplines)]

    heatmap_data = medals_top_countries.pivot(index="country_name", columns="discipline_title",
                                              values="medal_count").fillna(0)
    heatmap_data = heatmap_data.reindex(index=top_countries, fill_value=0)

    fig = px.imshow(
        heatmap_data,
        color_continuous_scale='YlGnBu',
        labels=dict(x="Discipline", y="Pays", color="Nombre de Médailles"),
        title="Répartition des Médailles par Pays et Discipline (Top 20 Pays)",
    )

    # Convertir la figure Plotly en HTML
    graph_html = pio.to_html(fig, full_html=False)

    # Retourner une vraie page HTML avec Django
    return HttpResponse(graph_html, content_type='text/html')


from django.http import JsonResponse
import plotly.express as px
import plotly.io as pio

from django.http import HttpResponse
import plotly.io as pio


def country_discipline_heatmap_json(request):
    olympic_medals_df = load_medals_data()

    medals_by_country_discipline = olympic_medals_df.groupby(['country_name', 'discipline_title']).size().reset_index(
        name='medal_count')

    top_countries = medals_by_country_discipline.groupby('country_name')['medal_count'].sum().nlargest(20).index
    medals_top_countries = medals_by_country_discipline[
        medals_by_country_discipline['country_name'].isin(top_countries)]

    top_disciplines = medals_top_countries.groupby('discipline_title')['medal_count'].sum().nlargest(30).index
    medals_top_countries = medals_top_countries[medals_top_countries['discipline_title'].isin(top_disciplines)]

    heatmap_data = medals_top_countries.pivot(index="country_name", columns="discipline_title",
                                              values="medal_count").fillna(0)
    heatmap_data = heatmap_data.reindex(index=top_countries, fill_value=0)

    fig = px.imshow(
        heatmap_data,
        color_continuous_scale='YlGnBu',
        labels=dict(x="Discipline", y="Pays", color="Nombre de Médailles"),
        title="Répartition des Médailles par Pays et Discipline (Top 20 Pays)",
    )

    # ✅ Serialize the figure using plotly.io.to_json
    fig_json = pio.to_json(fig)

    return HttpResponse(fig_json, content_type='application/json')


def country_discipline_barplot(request):
    olympic_medals_df = load_medals_data()

    medals_by_country_discipline = olympic_medals_df.groupby(['country_name', 'discipline_title'])[
        'medal_type'].count().reset_index()

    top_countries = medals_by_country_discipline.groupby('country_name')['medal_type'].sum().nlargest(15).index
    filtered_medals = medals_by_country_discipline[medals_by_country_discipline['country_name'].isin(top_countries)]

    fig = px.bar(
        filtered_medals,
        x="discipline_title",
        y="medal_type",
        color="country_name",
        title="Top 15 Pays Médaillés par Discipline",
        labels={"medal_type": "Nombre de Médailles", "discipline_title": "Discipline", "country_name": "Pays"},
        barmode="stack",
        height=700
    )

    # Convertir en image PNG
    img_bytes = pio.to_image(fig, format="png", width=1200, height=800)
    return HttpResponse(img_bytes, content_type='image/png')


def load_hosts_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_hosts.csv')
    olympic_hosts_df = pd.read_csv(csv_path)

    # Nettoyer les colonnes
    olympic_hosts_df.columns = olympic_hosts_df.columns.str.strip().str.lower()

    # Renommer 'game_slug' en 'slug_game' si besoin
    if 'game_slug' in olympic_hosts_df.columns:
        olympic_hosts_df = olympic_hosts_df.rename(columns={'game_slug': 'slug_game'})

    # Conversion des dates
    if 'game_start_date' in olympic_hosts_df.columns:
        olympic_hosts_df['game_start_date'] = pd.to_datetime(olympic_hosts_df['game_start_date']).dt.date
    if 'game_end_date' in olympic_hosts_df.columns:
        olympic_hosts_df['game_end_date'] = pd.to_datetime(olympic_hosts_df['game_end_date']).dt.date

    # Convertir année en int si besoin
    if 'game_year' in olympic_hosts_df.columns:
        olympic_hosts_df['game_year'] = olympic_hosts_df['game_year'].astype(int)

    return olympic_hosts_df


def sunburst_medals_season_json(request):
    olympic_medals_df = load_medals_data()
    olympic_hosts_df = load_hosts_data()

    # Merge medals + hosts to get season info
    olympic_medals_with_season = olympic_medals_df.merge(
        olympic_hosts_df[['slug_game', 'game_season']],
        on='slug_game',
        how='left'
    )

    # Agrégation des médailles par discipline et saison
    medal_by_discipline_season = olympic_medals_with_season.groupby(
        ['discipline_title', 'game_season']
    ).size().reset_index(name='medal_count')

    # Création du Sunburst Chart
    fig = px.sunburst(
        medal_by_discipline_season,
        path=['game_season', 'discipline_title'],
        values='medal_count',
        color='game_season',
        color_discrete_map={'Summer': 'gold', 'Winter': 'blue'}
    )

    # Supprimer le titre automatique
    fig.update_layout(title_text='')

    # Ajouter le titre sous le graphique
    fig.add_annotation(
        text="Répartition des Médailles par Discipline et Saison",
        showarrow=False,
        x=0.5,
        y=-0.1,
        xref='paper',
        yref='paper',
        font=dict(size=16, family='Arial'),
        align='center'
    )

    # ✅ Retourner en JSON propre
    fig_json = pio.to_json(fig)

    return HttpResponse(fig_json, content_type='application/json')


def load_medals_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_medals.csv')
    olympic_medals_df = pd.read_csv(csv_path)

    # Nettoyage rapide ici aussi
    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()
    columns_to_drop = ['athlete_url', 'country_code', 'country_3_letter_code']
    olympic_medals_df = olympic_medals_df.drop(columns=columns_to_drop, errors='ignore')

    olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    olympic_medals_df['athlete_full_name'] = olympic_medals_df['athlete_full_name'].fillna('No Data')
    olympic_medals_df['participant_title'] = olympic_medals_df['participant_title'].fillna('No Country')

    return olympic_medals_df


def scatter_medals_by_discipline_country_year_json(request):
    olympic_medals_df = load_medals_data()

    # Préparation des données
    medals_by_country = olympic_medals_df.groupby(
        ['country_name', 'discipline_title', 'year', 'medal_type']
    ).size().reset_index(name='medal_count')

    # Création du scatter plot
    fig = px.scatter(
        medals_by_country,
        x="discipline_title",
        y="year",
        size="medal_count",
        color="medal_type",
        hover_name="country_name",
        hover_data=["medal_count"],
        size_max=50,
        color_continuous_scale='Viridis',
        title='Distribution des Médailles par Discipline, Pays et Année',
        height=700
    )

    fig.update_traces(text=None)
    fig.update_layout(coloraxis_colorbar=dict(title="Type de Médaille"))

    fig_json = pio.to_json(fig)

    return HttpResponse(fig_json, content_type='application/json')


def load_medals_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_medals.csv')
    olympic_medals_df = pd.read_csv(csv_path)

    # Nettoyage rapide
    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()
    columns_to_drop = ['athlete_url', 'country_code', 'country_3_letter_code']
    olympic_medals_df = olympic_medals_df.drop(columns=columns_to_drop, errors='ignore')

    olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    olympic_medals_df['athlete_full_name'] = olympic_medals_df['athlete_full_name'].fillna('No Data')
    olympic_medals_df['participant_title'] = olympic_medals_df['participant_title'].fillna('No Country')

    return olympic_medals_df


def choropleth_medals_by_country_json(request):
    olympic_medals_df = load_medals_data()

    # Agrégation par pays
    medals_by_country = olympic_medals_df.groupby('country_name')['medal_type'].count().reset_index()

    # Création de la carte
    fig = px.choropleth(
        medals_by_country,
        locations="country_name",
        locationmode="country names",
        color="medal_type",
        hover_name="country_name",
        color_continuous_scale="Viridis"
    )

    # Personnalisation
    fig.update_layout(title_text='')
    fig.add_annotation(
        text="Distribution Géographique des Médailles",
        showarrow=False,
        x=0.5,
        y=-0.1,
        xref='paper',
        yref='paper',
        font=dict(size=16, family='Arial'),
        align='center'
    )

    fig.update_geos(
        visible=False,
        resolution=50,
        showcoastlines=True,
        coastlinecolor="Black",
        showland=True,
        landcolor="LightGrey",
        showocean=True,
        oceancolor="LightBlue",
        showlakes=True,
        lakecolor="LightBlue",
        showrivers=True,
        rivercolor="LightBlue"
    )

    fig.update_layout(margin={"r": 0, "t": 0, "l": 0, "b": 100})

    # Export JSON
    fig_json = pio.to_json(fig)

    return HttpResponse(fig_json, content_type='application/json')


def load_medals_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_medals.csv')
    olympic_medals_df = pd.read_csv(csv_path)

    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()
    olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    olympic_medals_df['athlete_full_name'] = olympic_medals_df['athlete_full_name'].fillna('No Data')

    return olympic_medals_df


from plotly.utils import PlotlyJSONEncoder


def load_athletes_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_athletes.csv')
    olympic_athletes_df = pd.read_csv(csv_path)

    olympic_athletes_df.columns = olympic_athletes_df.columns.str.strip()
    olympic_athletes_df['athlete_year_birth'] = olympic_athletes_df['athlete_year_birth'].fillna(0).astype(int)

    return olympic_athletes_df


def evolution_participants_olympics_json(request):
    olympic_medals_df = load_medals_data()
    olympic_athletes_df = load_athletes_data()

    # Fusionner pour récupérer l'année de participation
    merged_df = pd.merge(olympic_medals_df, olympic_athletes_df, on='athlete_full_name', how='left')

    # Comptage par année
    athletes_by_year = merged_df.groupby('year')['athlete_full_name'].nunique().reset_index()

    # Création du graphique
    fig = px.line(
        athletes_by_year,
        x="year",
        y="athlete_full_name",
        title="Évolution du nombre de participants aux Jeux Olympiques",
        labels={"year": "Année", "athlete_full_name": "Nombre d'Athlètes"}
    )

    fig.update_xaxes(range=[1896, 2024])  # Adapter si nécessaire

    fig_json = pio.to_json(fig)

    return HttpResponse(fig_json, content_type='application/json')


def load_medals_data():
    csv_path = os.path.join(settings.BASE_DIR, 'data', 'olympic_medals.csv')
    olympic_medals_df = pd.read_csv(csv_path)
    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()
    olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    olympic_medals_df['country_name'] = olympic_medals_df['country_name'].fillna('Unknown')
    return olympic_medals_df


def medals_bar_animation_json(request):
    # Charger les données
    olympic_medals_df = pd.read_csv('./data/olympic_medals.csv')
    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()

    # Ajouter l'année si besoin
    if 'year' not in olympic_medals_df.columns:
        olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)

    # Filtrer à partir de 1986
    filtered_medals_df = olympic_medals_df[olympic_medals_df['year'] >= 1986]

    # Agrégation par pays et année
    medals_by_country_year = filtered_medals_df.groupby(['country_name', 'year'])['medal_type'].count().reset_index()

    # Top 10 pays
    top_countries = medals_by_country_year.groupby('country_name')['medal_type'].sum().nlargest(10).index
    filtered_data = medals_by_country_year[medals_by_country_year['country_name'].isin(top_countries)]

    # Créer le graphique animé
    fig = px.bar(
        filtered_data,
        x="country_name",
        y="medal_type",
        color="country_name",
        animation_frame="year",
        animation_group="country_name",
        range_y=[0, filtered_data['medal_type'].max() + 20],
        title="🏅 Évolution du Nombre de Médailles par Pays (1986 - 2020)",
        labels={
            "country_name": "Pays",
            "medal_type": "Nombre de Médailles",
            "year": "Année"
        }
    )

    fig.update_layout(
        xaxis_title="Pays",
        yaxis_title="Nombre de Médailles",
        title_font_size=24,
        plot_bgcolor="white",
        bargap=0.3,
        showlegend=False,
        height=700,
        margin=dict(l=50, r=50, t=100, b=50)
    )

    # 🔥 Correctement sérialiser sans numpy ndarray
    graph_json = json.loads(json.dumps(fig, cls=PlotlyJSONEncoder))

    return JsonResponse(graph_json, safe=False)


def medals_evolution_top10_json(request):
    # Charger les données
    olympic_medals_df = pd.read_csv('./data/olympic_medals.csv')

    # Nettoyage basique
    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()
    if 'year' not in olympic_medals_df.columns:
        olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)

    # Agrégation des médailles par pays et année
    medals_by_country_year = olympic_medals_df.groupby(['country_name', 'year'])['medal_type'].count().reset_index()

    # Sélectionner les 10 premiers pays
    top_countries = medals_by_country_year.groupby('country_name')['medal_type'].sum().nlargest(10).index
    top_countries_medals = medals_by_country_year[medals_by_country_year['country_name'].isin(top_countries)]

    # Création du graphique
    fig = px.line(
        top_countries_medals,
        x="year",
        y="medal_type",
        color="country_name",
        title="Évolution du nombre de médailles pour les 10 premiers pays",
        labels={"year": "Année", "medal_type": "Nombre de médailles", "country_name": "Pays"}
    )

    # Ajouter un slider temporel
    fig.update_xaxes(rangeslider_visible=True)

    return JsonResponse({
        'data': fig.to_plotly_json()['data'],
        'layout': fig.to_plotly_json()['layout'],
    }, safe=False)


import json
import numpy as np


def medals_predictions_ml2024(request):
    with open('./data/ml_predictions_2024.json', 'r') as f:
        predictions = json.load(f)

    pred_df = pd.DataFrame(predictions)
    top10 = pred_df.groupby('country_name')['predicted_medals_2024'].sum().nlargest(10).index
    top_df = pred_df[pred_df['country_name'].isin(top10)]

    fig = px.bar(
        top_df,
        x='discipline_title',
        y='predicted_medals_2024',
        color='country_name',
        title="Prédictions des Médailles par Pays et Discipline (2024)",
        labels={
            'predicted_medals_2024': "Médailles Prévues",
            'discipline_title': "Discipline",
            'country_name': "Pays"
        },
        height=600
    )
    safe_json = json.dumps(fig.to_plotly_json(), cls=NumpyEncoder)
    return JsonResponse(json.loads(safe_json), safe=False)


class NumpyEncoder(json.JSONEncoder):
    """Permet de transformer np.int64, np.float64, np.ndarray... en types normaux"""

    def default(self, obj):
        if isinstance(obj, (np.integer, np.int_, np.intc, np.intp, np.int8, np.int16, np.int32, np.int64)):
            return int(obj)
        elif isinstance(obj, (np.floating, np.float16, np.float32, np.float64)):
            return float(obj)
        elif isinstance(obj, (np.ndarray,)):
            return obj.tolist()
        return super(NumpyEncoder, self).default(obj)


def top15_country_discipline_json(request):
    olympic_medals_df = pd.read_csv('./data/olympic_medals.csv')
    olympic_medals_df.columns = olympic_medals_df.columns.str.strip()
    olympic_medals_df['year'] = olympic_medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)

    medals_by_country_discipline = olympic_medals_df.groupby(['country_name', 'discipline_title'])[
        'medal_type'].count().reset_index()
    top_countries = medals_by_country_discipline.groupby('country_name')['medal_type'].sum().nlargest(15).index
    filtered_medals = medals_by_country_discipline[medals_by_country_discipline['country_name'].isin(top_countries)]

    fig = px.bar(filtered_medals,
                 x="discipline_title",
                 y="medal_type",
                 color="country_name",
                 title="Top 15 Pays Médaillés par Discipline",
                 labels={"medal_type": "Nombre de Médailles", "discipline_title": "Discipline", "country_name": "Pays"},
                 barmode="stack",
                 height=700)

    graph_json = fig.to_plotly_json()

    # ✅ On sérialise correctement avec NumpyEncoder
    safe_json = json.dumps(graph_json, cls=NumpyEncoder)

    return JsonResponse(json.loads(safe_json), safe=False)


from tensorflow.keras.layers import LSTM, Dense
import plotly.express as px


def prepare_olympic_data(medals_df, athletes_df, hosts_df, results_df, year_min=2000, min_discipline_presence=2):
    medals_df = medals_df.copy()
    hosts_df = hosts_df.copy()

    # Extraire l'année
    medals_df['year'] = medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)

    # Garder uniquement les jeux d'été
    hosts_df['game_season'] = hosts_df['game_season'].str.lower()
    summer_games = hosts_df[hosts_df['game_season'] == 'summer']
    medals_df = medals_df[medals_df['slug_game'].isin(summer_games['game_slug'])]

    # Filtrer les disciplines suffisamment présentes
    discipline_counts = medals_df.groupby('discipline_title')['year'].nunique()
    valid_disciplines = discipline_counts[discipline_counts >= min_discipline_presence].index
    medals_df = medals_df[medals_df['discipline_title'].isin(valid_disciplines)]

    # Fusionner avec les données des athlètes
    merged = medals_df.merge(athletes_df, on='athlete_full_name', how='left')

    # Fusionner avec les données des hôtes
    merged = merged.merge(
        hosts_df[['game_slug', 'game_year', 'game_season', 'game_location']],
        left_on='slug_game', right_on='game_slug', how='left', suffixes=('', '_host')
    )

    merged.dropna(subset=['discipline_title'], inplace=True)
    merged = merged[merged['year'] >= year_min]

    return merged


import numpy as np
import time  # ⬅️ Ajout ici


def medals_predictions_ml(request):
    with open('./data/ml_predictions_2020.json', 'r') as f:
        predictions = json.load(f)

    pred_df = pd.DataFrame(predictions)
    top10 = pred_df.groupby('country_name')['predicted_medals_2020'].sum().nlargest(10).index
    top_df = pred_df[pred_df['country_name'].isin(top10)]

    fig = px.bar(
        top_df,
        x='discipline_title',
        y='predicted_medals_2020',
        color='country_name',
        title="Prédictions des Médailles par Pays et Discipline (2020)",
        labels={
            'predicted_medals_2020': "Médailles Prévues",
            'discipline_title': "Discipline",
            'country_name': "Pays"
        },
        height=600
    )
    safe_json = json.dumps(fig.to_plotly_json(), cls=NumpyEncoder)
    return JsonResponse(json.loads(safe_json), safe=False)


import subprocess
import sys
import os


def regenerate_ml_predictions(request):
    try:
        python_exec = os.path.join(sys.prefix, 'Scripts', 'python.exe') if os.name == 'nt' else os.path.join(sys.prefix,
                                                                                                             'bin',
                                                                                                             'python')
        subprocess.run([python_exec, './scripts/generate_predictions.py'], check=True)
        return JsonResponse({'status': 'success', 'message': 'Prédictions recalculées avec succès ✅'})
    except subprocess.CalledProcessError as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


def country_to_flag(country):
    mapping = {
        "France": "FR", "Germany": "DE", "United States of America": "US",
        "People's Republic of China": "CN", "Australia": "AU", "Great Britain": "GB",
        "Brazil": "BR", "Canada": "CA", "Japan": "JP", "Italy": "IT"
    }
    iso_code = mapping.get(country, "")
    return ''.join([chr(127397 + ord(c)) for c in iso_code.upper()]) if iso_code else ''


def compare_predictions_real_2020(request):
    import plotly.express as px

    # Charger les prédictions
    with open('./data/ml_predictions_2020.json', 'r') as f:
        predictions = json.load(f)
    pred_df = pd.DataFrame(predictions)

    # Charger les données réelles
    medals_df = pd.read_csv('./data/olympic_medals.csv')
    medals_df['year'] = medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    real_df = medals_df[medals_df['year'] == 2020]

    # Regrouper les données
    real_counts = real_df.groupby(['country_name', 'discipline_title']).size().reset_index(name='real_medals')
    pred_grouped = pred_df.groupby(['country_name', 'discipline_title'])['predicted_medals_2020'].sum().reset_index()

    # Fusionner les deux
    merged = pd.merge(pred_grouped, real_counts, on=['country_name', 'discipline_title'], how='inner')

    # Top 10 pays les plus représentés
    top_countries = merged.groupby('country_name')['predicted_medals_2020'].sum().nlargest(5).index
    merged = merged[merged['country_name'].isin(top_countries)]

    # Construire une seule colonne pour chaque valeur (plus clair)
    melted = merged.melt(
        id_vars=['country_name', 'discipline_title'],
        value_vars=['predicted_medals_2020', 'real_medals'],
        var_name='Type',
        value_name='Médailles'
    )

    # Ajouter le drapeau aux noms
    melted['Flag'] = melted['country_name'].apply(country_to_flag)
    melted['Pays & Discipline'] = melted['Flag'] + ' ' + melted['country_name'] + ' – ' + melted['discipline_title']

    melted['Groupe'] = melted['country_name'] + ' (' + melted['Type'].str.replace('_', ' ') + ')'
    # Barres horizontales
    fig = px.bar(
        melted,
        y='Pays & Discipline',
        x='Médailles',
        color='Groupe',
        orientation='h',
        title="🎯 Comparaison Simplifiée : Prédictions vs Réel (2020)",
        labels={'Médailles': 'Nombre de Médailles'},
        height=700
    )

    # Format JSON pour le front
    graph_json = fig.to_plotly_json()
    safe_json = json.dumps(graph_json, cls=NumpyEncoder)
    return JsonResponse(json.loads(safe_json), safe=False)


from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
import pandas as pd
import json
from django.http import JsonResponse


def evaluate_ml_model(request):
    # Charger les prédictions
    with open('./data/ml_predictions_2024.json', 'r') as f:
        predictions = json.load(f)
    pred_df = pd.DataFrame(predictions)

    # Charger les données réelles
    medals_df = pd.read_csv('./data/olympic_medals.csv')
    medals_df['year'] = medals_df['slug_game'].str.extract(r'(\d{4})').astype(int)
    real_df = medals_df[medals_df['year'] == 2024]

    # Regrouper par pays + discipline
    real_counts = real_df.groupby(['country_name', 'discipline_title']).size().reset_index(name='real_medals')
    pred_df_grouped = pred_df.groupby(['country_name', 'discipline_title'])['predicted_medals_2024'].sum().reset_index()

    # Fusion pour évaluer uniquement les cas présents dans les deux jeux
    merged = pd.merge(pred_df_grouped, real_counts, on=['country_name', 'discipline_title'])

    # Extraction des valeurs
    y_true = merged['real_medals'].values
    y_pred = merged['predicted_medals_2024'].values

    # Calcul des scores
    mae = mean_absolute_error(y_true, y_pred)
    rmse = mean_squared_error(y_true, y_pred) ** 0.5
    r2 = r2_score(y_true, y_pred)

    # Retour JSON
    return JsonResponse({
        'mae': round(mae, 2),
        'rmse': round(rmse, 2),
        'r2_score': round(r2, 3),
        'count': len(y_true)
    })
