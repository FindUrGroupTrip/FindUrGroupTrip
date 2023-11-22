
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
from .models import Activite


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


class ActiviteListView(ListCreateAPIView):
    queryset = Activite.objects.all()
    serializer_class = ActiviteSerializer

