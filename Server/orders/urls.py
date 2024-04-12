from rest_framework.routers import DefaultRouter
from django.urls import path
from django.urls import include
from . import views


router = DefaultRouter()
router.register('', views.OrdersViewSet, basename='')

urlpatterns = [
    path('', include(router.urls)),

]