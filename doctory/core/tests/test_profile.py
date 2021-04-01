from core.utils import SexTypes
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from core.models import User, Patient


def authenticate(client, token_key):
    client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')

class ProfileTests(APITestCase):
    url = reverse('profile')
    
    def setUp(self):
        self.data = {
            'email': 'test@mail.com',
            'first_name': 'Raul',
            'last_name': 'Castellanos',
            'location': 'San Luis Potosi',
            'sex': SexTypes.MALE,
            'type': ['PAT'],
            }
        self.user = Patient.objects.create(**self.data)
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)

    def test_get_user_profie(self):
        """
        Ensure it can retrieve User's info
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data'], self.data)

    def test_put_user_profile(self):
        """
        Ensure it can update user's profile
        """
        new_fields = {
            'location': 'Monterrey',
            'sex': SexTypes.OTHER
            }
        response = self.client.put(self.url, new_fields)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        location = response.data['data']['location']
        sex = response.data['data']['sex']
        self.assertEqual(location, new_fields['location'])
        self.assertEqual(sex, new_fields['sex'])

    def test_put_wrong_profile_data(self):
        """
        Ensure 'sex' is validated
        """
        new_fields = {
            'location': 'Monterrey',
            'sex': 'something else'
            }
        response = self.client.put(self.url, new_fields)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
