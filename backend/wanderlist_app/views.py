from rest_framework import generics
from .models import Place
from .serializers import PlaceSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated


class PlaceListCreateView(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class PlaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlaceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Place.objects.filter(user=self.request.user)

