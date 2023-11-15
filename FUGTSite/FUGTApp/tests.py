# FUGTApp/tests.py

from django.test import TestCase
from django.test import RequestFactory
from django.http import FileResponse, HttpResponse
from django.conf import settings
import os
from FUGTApp.views import serve_static_image

class ServeStaticImageTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_serve_static_image(self):
        image_path = os.path.join(settings.STATIC_ROOT, 'carte-interactive.jpeg')

        if os.path.exists(image_path):
            with open(image_path, 'rb') as image_file:
                response = FileResponse(image_file)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.get('Content-Type'), 'image/jpeg')
        else:
            # Le fichier n'existe pas, on s'attend à une réponse 404
            response = serve_static_image(self.factory.get('/static/carte-interactive.jpeg/'))
            self.assertEqual(response.status_code, 404)

