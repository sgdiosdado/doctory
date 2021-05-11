from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from core.utils import standard_response
from core.models import MedicMore
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
                
                medic = MedicMore.objects.get(user__email=serializer.validated_data['email'])

            except MedicMore.DoesNotExist:

                res = standard_response(errors={'medic': 'This user does not exist.'})

                return Response(res, status=status.HTTP_404_NOT_FOUND)

            res = standard_response(errors={'history': 'Shared!'})

            request.user.patientmore.medics.add(medic)

            return Response(res, status.HTTP_201_CREATED)
        res = standard_response(errors=serializer.errors)

        return Response(res, status=status.HTTP_400_BAD_REQUEST)
