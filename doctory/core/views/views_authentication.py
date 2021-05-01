from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import SignupSerializer, LoginSerializer, ChangePasswordSerializer
from core.utils import standard_response


class Signup(APIView):

    def post(self, request):
        """
        Return token for newly created user
        """
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.get(user=user)
            res = standard_response(data={'token': token.key})
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
            res = standard_response(data=serializer.data)
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