from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','description', 'done']


# class ListSerializer(serializers.ModelSerializer):
#     tasks = TaskSerializer(many=True, read_only=True, allow_null = True)

#     class Meta:
#         model = List
#         fields = fields = ['id', 'name', 'owner', 'tasks']
        
#     def update(self, instance, validated_data):
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         return instance

        
# class SimpleListSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = List
#         fields = ['id', 'name']

# class ListWithTasksSerializer(serializers.ModelSerializer):
#     tasks = TaskSerializer(many=True, read_only=True)

#     class Meta:
#         model = List
#         fields = ['name', 'tasks']

    





        