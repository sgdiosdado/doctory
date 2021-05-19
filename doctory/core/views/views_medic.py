from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Patient, Medic, PatientMedic
from core.serializers import PatientProfileSerializer
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
        medic = Medic.objects.get(email=request.user.email)
        query_set = PatientMedic.objects.filter(medic=medic).values('patient')
        patients = Patient.objects.filter(id__in=query_set)
        serializer = PatientProfileSerializer(patients, many=True)
        res = standard_response(data=serializer.data)
        return Response(res)
