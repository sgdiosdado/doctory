from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Medic, Patient, PatientMedic
from core.serializers import MedicProfileSerializer
from core.utils import standard_response

class ListMedics(APIView):
    """
    View to list patient's medics

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
      """
      Return a list of all patient's medics
      """
      patient = Patient.objects.get(email=request.user.email)
      query_set = PatientMedic.objects.filter(patient=patient).values('medic')
      medics = Medic.objects.filter(id__in=query_set)
      serializer = MedicProfileSerializer(medics, many=True)
      res = standard_response(data=serializer.data)
      return Response(res)

class MedicDetail(APIView):
  """
  View retrieve and delete a related medic

  * Requires token authentication
  """

  permissions_classes = [permissions.IsAuthenticated]
  def delete(self, request, medic_id):
    """
    Delete existing PatientMedic relationship.
    """
    try:
      medic = Medic.objects.get(id=medic_id)
    except Medic.DoesNotExist:
      res = standard_response(errors={'medic': 'This medic does not exist'})
      return Response(res, status=status.HTTP_404_NOT_FOUND)

    patient = Patient.objects.get(email=request.user.email)
    patient.medics.remove(medic)
    res = standard_response()
    return Response(res, status.HTTP_204_NO_CONTENT)
  