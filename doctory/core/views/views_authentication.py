from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import SignupSerializer, LoginSerializer, ChangePasswordSerializer
from core.utils import standard_response
from rest_framework import permissions
from core.models import User

class Signup(APIView):

    def post(self, request):
        """
        Return token for newly created user
        """
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.get(user=user)
            res = standard_response(data={'token': token.key, 'types': user.type})
            return Response(res, status=status.HTTP_201_CREATED)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):

    def post(self, request):
        """
        Return token for logged user
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            data = {**serializer.data, 'types': Token.objects.get(key=serializer.data['token']).user.type}
            res = standard_response(data=data)
            return Response(res)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    def put(self, request):
        """
        Updates password and returns token
        """
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.data['password1']
            request.user.set_password(password)
            request.user.save()
            token = Token.objects.get(user=request.user)
            res = standard_response(data={'token': token.key})
            return Response(res)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)


class Types(APIView):
    """
    Views to get user's type

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of user's type
        """
        res = standard_response(data={'types': request.user.type})
        return Response(res)