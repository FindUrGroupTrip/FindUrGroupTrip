from rest_framework import serializers
from .models import Activite, Vacation

class ActiviteSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    class Meta:
        model = Activite
        fields = ['id', 'nom', 'lieu', 'description', 'date', 'average_rating']

    def get_average_rating(self, obj):
        return obj.average_rating

class VacationSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Vacation
        fields = '__all__'
