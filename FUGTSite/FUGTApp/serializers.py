from rest_framework import serializers
from .models import Activite, Vacation, Question, Answer

class ActiviteSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    number_of_notes = serializers.SerializerMethodField()
    class Meta:
        model = Activite
        fields = ['id', 'nom', 'lieu', 'description', 'date','image_path', 'average_rating', 'number_of_notes']

    def get_average_rating(self, obj):
        return obj.average_rating
    def get_number_of_notes(self, obj):
        return obj.number_of_notes


class VacationSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Vacation
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(source='author.username', read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(source='author.username', read_only=True)

    class Meta:
        model = Answer
        fields = '__all__'
