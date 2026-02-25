from.views import Attendance_all
from django.urls import path,include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'attendance',Attendance_all)


urlpatterns = [
    path('',include(router.urls))
]