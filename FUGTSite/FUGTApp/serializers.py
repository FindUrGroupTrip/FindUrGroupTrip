from rest_framework import serializers
from .models import Activite

class ActiviteSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    class Meta:
        model = Activite
        fields = ['id', 'nom', 'lieu', 'description', 'date', 'average_rating']

    def get_average_rating(self, obj):
        return obj.average_rating