from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Medic
from core.serializers import SpecialtySerializer
from core.utils import standard_response

class ListSpecialties(APIView):
    """
    View to list medic's specialties

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Creates new specialty for a user and returns it
        """
        serializer = SpecialtySerializer(data=request.data, many=True)
        if serializer.is_valid():
            medic = Medic.objects.get(email=request.user.email)
            serializer.save(medic=medic)
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)
