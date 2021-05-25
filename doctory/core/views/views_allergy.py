from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Patient
from core.serializers import AllergySerializer
from core.utils import standard_response

class ListAllergies(APIView):
    """
    View to list patient's allergies

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Creates new allergy for a user and returns it
        """
        serializer = AllergySerializer(data=request.data, many=True)
        if serializer.is_valid():
            patient = Patient.objects.get(email=request.user.email)
            serializer.save(patient=patient)
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)
