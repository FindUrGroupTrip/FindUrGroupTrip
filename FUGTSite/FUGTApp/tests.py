#from django.test import TestCase
#from django.urls import reverse
#from rest_framework.test import APIClient
#from .models import Activite
#from .serializers import ActiviteSerializer
#
#class ActiviteListViewTest(TestCase):
#    def setUp(self):
#        # Créez quelques objets Activite pour les tests
#        Activite.objects.create(nom="Activite1", lieu="Lieu1", description="Desc1", date="2023-01-01")
#        Activite.objects.create(nom="Activite2", lieu="Lieu2", description="Desc2", date="2023-02-01")
#
#        # URL de la vue ActiviteListView
#        self.url = reverse('activite-list')  # Assurez-vous que 'activite-list' est votre nom d'URL correct
#
#def test_activite_list_view(self):
#        # Utilisez un client API REST pour accéder à la vue
#        client = APIClient()
#        response = client.get(self.url)
#
#        # Vérifiez que la réponse a un code HTTP 200 (OK)
#        self.assertEqual(response.status_code, 200)
#
#        # Vérifiez que le nombre d'objets Activite dans la réponse est correct
#        data = response.json()
#        self.assertEqual(len(data), Activite.objects.count())
#
#        # Vérifiez que la structure des données est correcte en utilisant le sérialiseur
#        serializer = ActiviteSerializer(Activite.objects.all(), many=True)
#        self.assertEqual(data, serializer.data)
