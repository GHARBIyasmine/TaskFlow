from django.urls import path
from . import views
from .views import  TaskListView, TaskCreateView, TaskDetailView, TaskUpdateView, TaskDeleteView
    
urlpatterns = [
    path('', TaskListView.as_view(), name='task-list'),
    path('create/', TaskCreateView.as_view(), name='task-create'),
    path('view/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete'),

]
