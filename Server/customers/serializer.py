from rest_framework import serializers
from django.core.validators import MinLengthValidator, EmailValidator, RegexValidator
from .models import Customer

email_validator = EmailValidator()
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'id',
            'fullName',
            'email',
            'phone',
        ]
    


    def validate_phone(self, value):
        phone_regex = r'^05[02348]\d{7}$'
        phone_validator = RegexValidator(regex=phone_regex)
        phone_validator(value)
        return value
