from rest_framework import serializers
from .models import TodoList


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'content', 'create_time', 'status')

    def validate_content(self,value):
    	if len(value) > 50:
    		raise serializers.ValidationError("Content length restricted to 50 characters.")
    	return value