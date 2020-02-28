"""todos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from core import views


urlpatterns = [
    path('', views.todos_list, name='todos-list'),
    path('todos/new/', views.todos_new, name='todos-new'),
    path('todos/<int:pk>/', views.todos_detail, name='todos-detail'),
    path('todos/<int:pk>/edit/', views.todos_edit, name='todos-edit'),
    path('todos/<int:pk>/delete/', views.todos_delete, name='todos-delete'),
    path('todos/<slug:slug>/', views.todos_by_tag, name='todos-by-tag'), 
    path('admin/', admin.site.urls),
]
