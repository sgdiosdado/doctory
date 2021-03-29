from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Condition
from core.serializers import ConditionSerializer
from core.utils import standard_response


class ListConditions(APIView):
    """
    View to list all conditions of a user

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of all conditions of patient
        """
        conditions = ConditionSerializer(Condition.objects.filter(patient=request.user), many=True)
        res = standard_response(data=conditions.data)
        return Response(res)
 
    def post(self, request):
        """
        Creates new condition for a user and returns it
        """
        serializer = ConditionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient=request.user)
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)


class ConditionDetail(APIView):
    """
    View retrieve and modify a condition

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request, condition_id):
        try:
            condition = Condition.objects.get(id=condition_id, patient=request.user)
            res = standard_response(data=ConditionSerializer(condition).data)
            return Response(res)
        except Condition.DoesNotExist:
            res = standard_response(errors={'forbidden': 'You are not the owner of this condition'})
            return Response(res, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, condition_id):
        try:
            condition = Condition.objects.get(id=condition_id, patient=request.user)
            serializer = ConditionSerializer(condition, data=request.data)
            if serializer.is_valid():
                serializer.save(patient=request.user)
                res = standard_response(data=serializer.data)
                return Response(res)
            res = standard_response(errors=serializer.errors)
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        except Condition.DoesNotExist:
            res = standard_response(errors={'forbidden': 'You are not the owner of this condition'})
            return Response(res, status=status.HTTP_403_FORBIDDEN)