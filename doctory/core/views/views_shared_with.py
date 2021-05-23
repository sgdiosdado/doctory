from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Medic, PatientMedic, MedicMore, User
from core.serializers import ProfileSerializer
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
      query_set = PatientMedic.objects.filter(patient=request.user.patientmore).values('medic__user')
      medics = Medic.objects.filter(id__in=query_set)
      serializer = ProfileSerializer(medics, many=True)
      res = standard_response(data=serializer.data)
      return Response(res)
    # def delete(self, request):
    #   """
    #   Delete existing PatientMedic relationship.
    #   """
    #   print(request)
    #   if 'medic_id' in request.query_params:
    #     medic_id = request.query_params['medic_id']
    #     print(medic_id)
    #     medic_more = MedicMore.objects.get(id=medic_id).more
    #     request.user.patientmore.medics.remove(medic_more)
    #     res = standard_response()
    #     return Response(res, status.HTTP_204_NO_CONTENT)
    #   else:
    #     res = standard_response(errors={'forbidden': 'You are not able to remove this relationship'})
    #     return Response(res, status=status.HTTP_403_FORBIDDEN)

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
    medic_more = Medic.objects.get(id=medic_id).more
    request.user.patientmore.medics.remove(medic_more)
    res = standard_response()
    return Response(res, status.HTTP_204_NO_CONTENT)
  