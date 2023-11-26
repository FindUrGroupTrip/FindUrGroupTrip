from rest_framework import serializers
from .models import Activite, Vacation

class ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activite
        fields = '__all__'

class VacationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacation
        fields = '__all__'