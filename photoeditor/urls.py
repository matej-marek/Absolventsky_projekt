from django.urls import path
from . import views
from django.shortcuts import redirect

app_name = 'photoeditor'
urlpatterns = [
     path('', lambda request: redirect('cs/', permanent=True)),
     path('histogram/', views.histogram, name='histogram'),
     path('documention/', views.documention, name='documention'),
     path('basiccoloredit/', views.basiccoloredit, name='basiccoloredit'),
     path('obrazek/', views.obrazek, name='obrazek'),
     path('<slug:lang>/', views.photoeditor, name='photoeditor'),
]