from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import BackgroundType, BackgroundSubtype
from core.serializers import BackgroundTypeSerializer, BackgroundSubtypeSerializer
from core.utils import standard_response


class ListBackgroundTypes(APIView):
    """
    View to list all background types

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of all background types
        """
        background_types = BackgroundType.objects.all()
        serializer = BackgroundTypeSerializer(background_types, many=True)
        res = standard_response(data=serializer.data)
        return Response(res)

class ListBackgroundSubtypes(APIView):
    """
    View to list all background subtypes

    * Requires token authentication
    """

    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return a list of all background subtypes
        """
        background_subtypes = BackgroundSubtype.objects.all()
        serializer = BackgroundSubtypeSerializer(background_subtypes, many=True)
        res = standard_response(data=serializer.data)
        return Response(res)