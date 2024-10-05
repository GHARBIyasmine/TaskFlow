from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import generics
from .models import CustomUser
from .serializers import CustomUserSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import get_user_model



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(
            {
                "status": 200,
                "message": "User created successfully",
                
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access their info

    # Override to fetch only the requesting user's details
    def get_object(self):
        return self.request.user

    # Customize the GET response to return only the email field
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        return Response({"email": user.email})

    # Customize the PATCH request to use the serializer's update method
    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)
        
        # Use the serializer's update method to save changes
        serializer.update(user, serializer.validated_data)

        return Response({"email": user.email}, status=status.HTTP_200_OK)
    
class UserDeleteView(generics.DestroyAPIView):
    queryset = get_user_model().objects.all()  # Fetch all users
    permission_classes = [permissions.IsAuthenticated]  # Ensure the user is authenticated

    def get_object(self):
        # Return the requesting user
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()  # Delete the user instance
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content response