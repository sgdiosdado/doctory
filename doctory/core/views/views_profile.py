from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Patient
from core.serializers import ProfileSerializer
from core.utils import standard_response

class Profile(APIView):
    """
    View to list user's profile information

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return profile's information
        """
        try:
            patient = Patient.objects.get(id=request.user.id)
            serializer = ProfileSerializer(patient)
            res = standard_response(data=serializer.data)
            return Response(res)
        except Patient.DoesNotExist:
            res = standard_response(errors={'user': 'Not found'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request):
        """
        Put user's profile information
        """
        try:
            patient = Patient.objects.get(id=request.user.id)
            serializer = ProfileSerializer(patient, data=request.data) #partial=True
            if serializer.is_valid():
                serializer.save(patient=request.user)
                res = standard_response(data=serializer.data)
                return Response(res)
            res = standard_response(errors=serializer.errors)
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        except Patient.DoesNotExist:
            res = standard_response(errors={'user': 'Not found'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
    
       