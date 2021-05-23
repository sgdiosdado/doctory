from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from core.utils import standard_response
from core.models import Medic, Patient
from core.serializers import ShareSerializer


class ShareHistory(APIView):
    """
    View to share patient's history with medic

    * Requires token authentication
    """
    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ShareSerializer(data=request.data)
        if serializer.is_valid():
            try:
                patient = Patient.objects.get(email=request.user.email)
                medic = Medic.objects.get(email=serializer.validated_data['email'])
                medic.patients.add(patient)
                res = standard_response()
                return Response(res, status=status.HTTP_201_CREATED)
            except Medic.DoesNotExist:
                res = standard_response(errors={'medic': 'This user does not exist.'})
                return Response(res, status=status.HTTP_404_NOT_FOUND)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)
