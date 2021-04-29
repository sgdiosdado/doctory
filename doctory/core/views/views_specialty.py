from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Specialty
from core.serializers import SpecialtySerializer
from core.utils import standard_response

class ListSpecialties(APIView):
    """
    View to list medic's specialties

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of all specialties
        """
        specialties = Specialty.objects.all()
        serializer = SpecialtySerializer(specialties, many=True)
        res = standard_response(data=serializer.data)
        return Response(res)