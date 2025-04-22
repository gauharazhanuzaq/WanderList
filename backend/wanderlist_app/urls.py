from django.urls import path
from .views import PlaceListCreateView, PlaceRetrieveUpdateDestroyView

urlpatterns = [
    path('', PlaceListCreateView.as_view(), name='place-list-create'),
    path('<int:pk>/', PlaceRetrieveUpdateDestroyView.as_view(), name='place-detail'),
]
