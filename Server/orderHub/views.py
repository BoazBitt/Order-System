from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getUser(request, username):
    try:
        user = User.objects.get(username=username)
        return Response({'first_name': user.first_name, 'last_name': user.last_name})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    