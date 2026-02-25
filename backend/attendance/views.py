from django.shortcuts import render
from.models import Attendance
from.serializer import AttendanceSerializer
from rest_framework import viewsets

class Attendance_all(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer