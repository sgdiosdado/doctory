from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from core.models import Medic, Patient, Condition
from core.serializers import ConditionSerializer

from core.utils import standard_response


# TODO: Re-write this when Medic-Patient relation is done
class ListPatients(APIView):
    """
    View to list all patients linked to a medic.

    * Requires token authentication.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Return a list of all patients.
        """
        usernames = Patient.objects.all().values_list('username', 'is_staff', 'is_superuser')
        return Response(usernames)


class ListConditions(APIView):
    """
    View to list all conditions of a user

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of all conditions of patient
        """
        conditions = ConditionSerializer(Condition.objects.filter(patient=request.user), many=True)
        res = standard_response(data=conditions.data)
        return Response(res)
    
    def post(self, request):
        """
        Creates new condition for a user and returns it
        """
        serializer = ConditionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient=request.user)
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)