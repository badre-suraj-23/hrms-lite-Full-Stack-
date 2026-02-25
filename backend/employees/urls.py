from django.urls import path,include
from.views import Employee_all
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'employees', Employee_all)
urlpatterns = [
    path('',include(router.urls))
]