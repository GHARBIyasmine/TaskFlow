from django.urls import path
from .views import RegisterView, UserDeleteView, UserDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='user-register'),
    path('user-details/', UserDetailView.as_view(), name='user-details'),
    path('user-delete/', UserDeleteView.as_view(), name='delete-user'),
]