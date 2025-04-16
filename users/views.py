from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore

@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
