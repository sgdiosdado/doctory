from typing import List
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views.views_user import ListPatients, ListConditions

urlpatterns = [
    path('patients/', ListPatients.as_view(), name='patients'),
    path('conditions/', ListConditions.as_view(), name='conditions'),
    path('api-token-auth/', obtain_auth_token)
]
