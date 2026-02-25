# from.models import Attendance
# from rest_framework import serializers
# from datetime import date

# class AttendanceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Attendance
#         fields = '__all__'

#     def validate_date(self,value):
#         if value > date.today():
#             raise serializers.ValidationError('Attendance date cannot be in the future.')
#         return value

from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'