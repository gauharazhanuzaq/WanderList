from rest_framework import serializers
from .models import Place, Review, Category


class PlaceSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Place
        fields = ['id', 'title', 'description', 'country', 'city', 'is_visited', 'image', 'user', 'username', 'created_at']
        read_only_fields = ['user', 'username', 'created_at']


    def get_username(self, obj):
        return obj.user.username if obj.user else None



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
