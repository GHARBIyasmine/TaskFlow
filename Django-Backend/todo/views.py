from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer
from rest_framework import permissions

class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return tasks only for the authenticated user
        return Task.objects.filter(owner=self.request.user)


class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save the task with the user set to the one making the request
        serializer.save(owner=self.request.user)


class TaskDetailView(generics.RetrieveAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow the user to access their own tasks
        return Task.objects.filter(owner=self.request.user)


class TaskUpdateView(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow the user to update their own tasks
        return Task.objects.filter(owner=self.request.user)


class TaskDeleteView(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow the user to delete their own tasks
        return Task.objects.filter(owner=self.request.user)




# Create your views here.
# this is a request handler

# @api_view(['GET'])
# def hello_world(request):
#     return Response("good job on using django api!")
#
#
# @api_view(['GET'])
# def todo_list(request):
#     todos = Todo.objects.all()
#     serializer = TodoSerializer(todos, many=True)
#     return Response(serializer.data)
#
# @api_view(['GET'])
# def todo_detail(request, pk):
#     todo = Todo.objects.get(id = pk)
#     serializer = TodoSerializer(todo, many=False)
#     return Response(serializer.data)
#
# @api_view(['POST'])
# def todo_add(request):
#     serializer = TodoSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#
#     return Response(serializer.data)
#
# @api_view(['POST'])
# def todo_update(request, pk):
#     todo = Todo.objects.get(id=pk)
#     serializer = TodoSerializer(instance=todo, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def todo_delete(request, pk):
#     todo = Todo.objects.get(id=pk)
#     todo.delete()
#     return Response('todo deleted')

# class TaskListView(generics.ListAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer



# class TaskCreateView(generics.CreateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskDetailView(generics.RetrieveAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskUpdateView(generics.UpdateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskDeleteView(generics.DestroyAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class ListListView(generics.ListAPIView):
#     queryset = List.objects.all()
#     serializer_class = SimpleListSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return List.objects.filter(owner=self.request.user)
    
# class ListTasksView(generics.ListAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         list_id = self.kwargs['pk']
#         return Task.objects.filter(list_id=list_id)

# class ListWithTasksView(generics.RetrieveAPIView):
#     queryset = List.objects.all()
#     serializer_class = ListWithTasksSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         # Filter lists by the authenticated user
#         return List.objects.filter(owner=self.request.user)



# class ListCreateView(generics.CreateAPIView):
#     queryset = List.objects.all()
#     serializer_class = ListSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         self.instance = serializer.save(owner=self.request.user)

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         response_data = {
#             "id": self.instance.id,
#             "name": self.instance.name
#         }
#         return Response(response_data, status=201, headers=headers)


# class ListDetailView(generics.RetrieveAPIView):
#     queryset = List.objects.all()
#     serializer_class = ListSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return List.objects.filter(owner=self.request.user)
    

# class ListUpdateView(generics.UpdateAPIView):
#     queryset = List.objects.all()
#     serializer_class = ListSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return List.objects.filter(owner=self.request.user)

#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
        
#         response_data = {
           
#             "id": instance.id,
#             "name": instance.name
#         }
#         return Response(response_data, status=status.HTTP_200_OK)

#     def perform_update(self, serializer):
#         serializer.save()


# class ListDeleteView(generics.DestroyAPIView):
#     queryset = List.objects.all()
#     serializer_class = ListSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return List.objects.filter(owner=self.request.user)
