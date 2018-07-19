from django.http import HttpResponse, JsonResponse,Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .serializers import TodoListSerializer
from rest_framework.views import APIView
from rest_framework import status
from .models import TodoList
from django.core.exceptions import ObjectDoesNotExist


class TodoListView(APIView):
	def get(self, request, format=None):
		todolists = TodoList.objects.all()
		serializer = TodoListSerializer(todolists, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = TodoListSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetail(APIView):
	def get_object(self, pk):
		try:
			return TodoList.objects.get(pk=pk)
		except TodoList.ObjectDoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		todolist = self.get_object(pk)
		serializer = TodoListSerializer(todolist)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		todolist = self.get_object(pk)
		serializer = TodoListSerializer(todolist, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		todolist = self.get_object(pk)
		todolist.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
