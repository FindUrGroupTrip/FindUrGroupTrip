from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


# from .models import VotreModele


class HelloWorldView(APIView):
    def get(self, request):
        message = "Hello, World!"
        return Response({"message": message})


from django.http import FileResponse
from django.conf import settings
import os


def serve_static_image(request):
    image_path = os.path.join(settings.STATIC_ROOT, 'carte-interactive.jpeg')
    with open(image_path, 'rb') as image_file:
        return FileResponse(image_file)
