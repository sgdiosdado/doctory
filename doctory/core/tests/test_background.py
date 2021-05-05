from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from core.models import Patient, BackgroundType


def authenticate(client, token_key):
    client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')


class ListBackgroundTypesTests(APITestCase):
    fixtures = [
        'core/fixtures/0001_BackgroundTypes.json',
        'core/fixtures/0002_BackgroundSubtypes.json'
        ]
    
    url = reverse('background_types')

    def setUp(self):
        self.user = Patient.objects.create(email='test@mail.com')
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)
    
    def test_retrieve_background_types(self):
        """
        Ensure to retrieve all background types with subtypes
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), BackgroundType.objects.count())