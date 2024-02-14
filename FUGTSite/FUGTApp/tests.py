from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import SimpleTestCase, RequestFactory
from django.http import HttpRequest
from unittest.mock import patch, MagicMock
from .views import get_activite_details, register_view,GetWhatsapp, AddFeedbackimage
from .models import Activite, Whatsappchanel
from django.contrib.auth.models import User
from django.urls import reverse
from django.test import SimpleTestCase
from rest_framework.test import APIRequestFactory
from .views import activite_list
from datetime import datetime
class ActiviteDetailsTestCase(SimpleTestCase):
    @patch('FUGTApp.views.get_object_or_404')
    def test_get_activite_details_no_db(self, mock_get_object_or_404):
        # Configurer le mock pour retourner un objet Activite spécifique
        activite_mock = Activite()
        activite_mock.id = 1
        activite_mock.nom = "Randonnée en montagne"
        activite_mock.lieu = "Alpes"
        activite_mock.description = "Une belle randonnée."
        activite_mock.date = "2021-07-16"
        activite_mock.image_path = "/chemin/vers/image.jpg"
        mock_get_object_or_404.return_value = activite_mock

        # Créer une requête HTTP fictive
        request = HttpRequest()

        # Appeler la vue
        response = get_activite_details(request, id=1)

        # Vérifier la réponse
        self.assertEqual(response.status_code, 200)

        # Vérifier que le mock a été appelé correctement
        mock_get_object_or_404.assert_called_once_with(Activite, id=1)

        # Vérifier le contenu de la réponse
        expected_response_data = {
            'idactivite': activite_mock.id,
            'nom': activite_mock.nom,
            'lieu': activite_mock.lieu,
            'date': activite_mock.date,
            'description': activite_mock.description,
            'image_path': activite_mock.image_path
        }
        self.assertJSONEqual(response.content.decode('utf-8'), expected_response_data)



class ActiviteListTestCase(SimpleTestCase):
    @patch('FUGTApp.models.Activite.objects')
    @patch('FUGTApp.serializers.ActiviteSerializer')
    def test_activite_list_no_db(self, mock_serializer, mock_objects):
        # Configurer les mocks
        mock_queryset = MagicMock()
        mock_objects.all.return_value = mock_queryset

        # Filtrage mock
        mock_queryset.filter.return_value = mock_queryset

        # Mock de la réponse du sérialiseur
        mock_serializer_instance = MagicMock()
        mock_serializer_instance.data = [{'id': 1, 'nom': 'Randonnée en montagne'}]
        # Configurez return_value pour retourner une instance mockée lors de l'instanciation du sérialiseur
        mock_serializer.return_value = mock_serializer_instance

        mock_serializer.data = [{'id': 1, 'nom': 'Randonnée en montagne'}]

        # Créer une requête HTTP fictive avec des paramètres de requête
        factory = APIRequestFactory()
        request = factory.get('/activite_list?nom=Randonnée&lieu=Alpes&date=2021-07-16')

        # Appeler la vue
        response = activite_list(request)

        # Vérifications
        self.assertEqual(response.status_code, 200)

class RegisterViewTestCase(SimpleTestCase):

    @patch('FUGTApp.views.User.objects.filter')
    def test_register_view_post_user_exists(self, mock_filter):
        # Configurer le mock pour simuler un utilisateur existant
        mock_filter.return_value.exists.return_value = True

        # Simuler une requête POST
        request = HttpRequest()
        request.method = 'POST'
        request.POST['username'] = 'existing_user'
        request.POST['email'] = 'user@example.com'
        request.POST['password'] = 'password123'

        response = register_view(request)

        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(response.content.decode(), {'error': 'Ce nom d\'utilisateur existe déjà.'})

    def test_register_view_options(self):
        # Simuler une requête OPTIONS
        request = HttpRequest()
        request.method = 'OPTIONS'

        response = register_view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Access-Control-Allow-Origin'], 'http://localhost:3000')
        self.assertEqual(response['Access-Control-Allow-Methods'], 'POST, OPTIONS')
        self.assertEqual(response['Access-Control-Allow-Headers'], 'Content-Type, Authorization, x-csrftoken')

    def test_register_view_unsupported_method(self):
        # Simuler une requête GET pour tester la réponse de méthode non autorisée
        request = HttpRequest()
        request.method = 'GET'

        response = register_view(request)

        self.assertEqual(response.status_code, 405)
        self.assertJSONEqual(response.content.decode(), {'error': 'Méthode non autorisée'})


class GetWhatsappTestCase(SimpleTestCase):
    def setUp(self):
        # La RequestFactory est utile pour créer des requêtes HTTP pour les tests
        self.factory = RequestFactory()

    @patch('FUGTApp.views.Whatsappchanel.objects.get')
    def test_get_whatsapp_channel_exists(self, mock_get):
        # Configurer le mock pour simuler un objet Whatsappchanel trouvé
        mock_get.return_value = MagicMock(link='http://example.com/whatsapp')

        # Créer une requête GET et appeler la vue
        request = self.factory.get(reverse('get_whatsapp', kwargs={'idactivite': 1}))
        response = GetWhatsapp.as_view()(request, idactivite=1)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content.decode(), {'link': 'http://example.com/whatsapp'})

    @patch('FUGTApp.views.Whatsappchanel.objects.get')
    def test_get_whatsapp_channel_not_found(self, mock_get):
        # Configurer le mock pour lever une exception lorsque le canal n'est pas trouvé
        mock_get.side_effect = Whatsappchanel.DoesNotExist

        # Créer une requête GET et appeler la vue
        request = self.factory.get(reverse('get_whatsapp', kwargs={'idactivite': 999}))
        response = GetWhatsapp.as_view()(request, idactivite=999)

        self.assertEqual(response.status_code, 404)
        self.assertJSONEqual(response.content.decode(), {'error': 'Lien non trouvé'})

class AddFeedbackimageTestCase(SimpleTestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch('FUGTApp.views.Feedbackimage.objects.create')
    def test_add_feedback_image_post_success(self, mock_create):
        # Configurer le mock pour simuler une instance de Feedbackimage
        mock_instance = MagicMock()
        mock_instance.idfeedbackimage = "12345"
        mock_instance.image.url = "/url/to/image"
        mock_create.return_value = mock_instance

        # Créer une requête POST fictive
        data = {'some_data': 'value'}
        file_dict = {'image': SimpleUploadedFile('test_image.jpg', b'file_content')}
        request = self.factory.post('/add_feedback_image/1', data, **{'HTTP_ACTIVITY_ID': '1', 'FILES': file_dict})

        response = AddFeedbackimage.as_view()(request, activity_id='1')

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content.decode(), {'idfeedbackimage': '12345'})

    def test_add_feedback_image_post_no_id(self):
        # Créer une requête POST fictive sans activity_id
        request = self.factory.post('/add_feedback_image/', {}, **{'HTTP_ACTIVITY_ID': ''})

        response = AddFeedbackimage.as_view()(request)

        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(response.content.decode(), {'error': "ID de l'activité manquant dans les paramètres de l'URL"})

    @patch('FUGTApp.views.Feedbackimage.objects.create')
    def test_add_feedback_image_post_exception(self, mock_create):
        # Configurer le mock pour lever une exception lors de la création
        mock_create.side_effect = Exception("Test Exception")

        # Créer une requête POST fictive
        data = {'some_data': 'value'}
        file_dict = {'image': SimpleUploadedFile('test_image.jpg', b'file_content')}
        request = self.factory.post('/add_feedback_image/1', data, **{'HTTP_ACTIVITY_ID': '1', 'FILES': file_dict})

        response = AddFeedbackimage.as_view()(request, activity_id='1')

        self.assertEqual(response.status_code, 500)
        self.assertJSONEqual(response.content.decode(), {'error': "Une erreur s'est produite"})

