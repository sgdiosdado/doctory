from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User, PatientMedic, Medic, Patient
from core.serializers import PatientProfileSerializer, MedicProfileSerializer
from core.utils import standard_response
from core.utils import UserTypes

class Profile(APIView):
    """
    View to list user's profile information

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    user_serializers = {
            UserTypes.PATIENT: PatientProfileSerializer,
            UserTypes.MEDIC: MedicProfileSerializer
    }
    
    user_models = {
        UserTypes.PATIENT: Patient,
        UserTypes.MEDIC: Medic
    }

    def get(self, request):
        """
        Return profile's information
        """
        user = self.user_models[request.user.type[0]].objects.get(email=request.user.email)
        
        profile_serializer = self.user_serializers[user.type[0]]
        
        if 'patient_id' in request.query_params:
            patient_id = request.query_params['patient_id']
            profile_serializer = PatientProfileSerializer
            try:
                patient_medic = PatientMedic.objects.get(medic=request.user.medicmore, patient__user__id=patient_id)
            except PatientMedic.DoesNotExist:
                res = standard_response(errors={'patient': 'This user has no access to the patient\'s information'})
                return Response(res, status=status.HTTP_404_NOT_FOUND)
            user = patient_medic.patient.user
        
        serializer = profile_serializer(user)
        res = standard_response(data=serializer.data)
        return Response(res)
    
    def put(self, request):
        """
        Put user's profile information

        """
        user = self.user_models[request.user.type[0]].objects.get(email=request.user.email)
        
        profile_serializer = self.user_serializers[user.type[0]]
        try:
            user_serializer = profile_serializer(user, data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                res = standard_response(data=user_serializer.data)
                return Response(res)
            res = standard_response(errors=user_serializer.errors)
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            res = standard_response(errors={'user': 'Not found'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
