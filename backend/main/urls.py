from django.urls import path

from . import views

urlpatterns = [
    path('test', views.test, name = 'test'),
    path('analyzeBagImage', views.analyzeImage, name='analyze-bag-image'),
    path('passengerBagInfo', views.showCheckedBagsInfo, name='passenger-bag-info')
]