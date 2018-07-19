from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^todolist/$', views.TodoListView.as_view(), name="get-todolist"),
    url(r'^todolist/(?P<pk>[0-9]+)/$', views.TodoDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
