from django.shortcuts import render
from.models import Employee
from.serializer import EmpSerializer
from rest_framework import viewsets

class Employee_all(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by('-created_at')
    serializer_class = EmpSerializer
