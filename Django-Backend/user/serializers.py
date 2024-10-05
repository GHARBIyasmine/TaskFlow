# users/serializers.py
from django.forms import ValidationError
from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        username = email.split('@')[0]  # Set the username to the part before the '@'
        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=validated_data['password']
        )
        return user
    
    def update(self, instance, validated_data):
        # Update email if provided
        if 'email' in validated_data:
            new_email = validated_data['email']  # Directly access validated_data['email']
            
            # Check if the email is already taken by another user
            if CustomUser.objects.filter(email=new_email).exists() and new_email != instance.email:
                raise serializers.ValidationError({"email": "This email is already in use."})

            # Update the email and username if the email has changed
            if new_email != instance.email:
                instance.email = new_email
                instance.username = new_email.split('@')[0]  # Update the username based on email

        # Update password if provided
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        # Save the updated instance
        instance.save()
        return instance