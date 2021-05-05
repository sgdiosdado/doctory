from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User, PatientMedic
from core.serializers import ProfileSerializer, UserProfileSerializer, PatientProfileSerializer, MedicProfileSerializer
from core.utils import standard_response
from core.utils import UserTypes

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
        user = request.user
        if 'patient_id' in request.query_params:
            patient_id = request.query_params['patient_id']
            try:
                patient_medic = PatientMedic.objects.get(medic=request.user.medicmore, patient__user__id=patient_id)
            except PatientMedic.DoesNotExist:
                res = standard_response(errors={'patient': 'This user has no access to the patient\'s information'})
                return Response(res, status=status.HTTP_404_NOT_FOUND)
            user = patient_medic.patient.user
        serializer = ProfileSerializer(user)
        res = standard_response(data=serializer.data)
        return Response(res)
    
    def put(self, request):
        """
        Put user's profile information
        """

        try:
            res = {}
            user = User.objects.get(id=request.user.id)
            user_serializer = UserProfileSerializer(user, data=request.data)
            # # valdidar que sea paceinte
            if UserTypes.PATIENT in user.type and 'patient' in request.data:
                patient_serializer = PatientProfileSerializer(user.patientmore, data=request.data['patient'])
                if not patient_serializer.is_valid():
                    res = standard_response(errors=patient_serializer.errors)
                    return Response(res, status=status.HTTP_400_BAD_REQUEST)
                patient_serializer.save(patientmore=request.user.patientmore)
                res['patient'] = patient_serializer.data
            
            # # valdidar que sea medico
            if UserTypes.MEDIC in user.type and 'medic' in request.data:
                medic_serializer = MedicProfileSerializer(user.medicmore, data=request.data['medic'])
                if not medic_serializer.is_valid():
                    res = standard_response(errors=medic_serializer.errors)
                    return Response(res, status=status.HTTP_400_BAD_REQUEST)
                medic_serializer.save(medicmore=request.user.medicmore)
                res['medic'] = medic_serializer.data
                    

            if not user_serializer.is_valid():
                res = standard_response(errors=user_serializer.errors)
                return Response(res, status=status.HTTP_400_BAD_REQUEST) 

            user_serializer.save(user=request.user)

            user_data = user_serializer.data
            res = standard_response(data={**user_data, **res})
            return Response(res)

        except User.DoesNotExist:
            res = standard_response(errors={'user': 'Not found'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
    
       