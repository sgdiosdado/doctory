from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Patient, PatientMedic
from core.serializers import ProfileSerializer
from core.utils import standard_response

class ListPatients(APIView):
    """
    View to list medic's patients

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of all medic's patients
        """
        query_set = PatientMedic.objects.filter(medic=request.user.medicmore).values('patient__user')
        patients = Patient.objects.filter(id__in=query_set)
        serializer = ProfileSerializer(patients, many=True)
        res = standard_response(data=serializer.data)
        return Response(res)