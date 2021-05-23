from core.utils import SexTypes
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from core.models import Patient, Medic


def authenticate(client, token_key):
    client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')

class PatientProfileTests(APITestCase):
    url = reverse('profile')
    
    def setUp(self):
        self.data = {
            'email': 'test@mail.com',
            'first_name': 'Raul',
            'last_name': 'Castellanos',
            'location': 'San Luis Potosi',
            'sex': SexTypes.MALE,
            'type': ['PAT']
            }
        self.user = Patient.objects.create(**self.data)
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)

    def test_get_patient_user_profie(self):
        """
        Ensure it can retrieve Patient's info
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['first_name'], self.data['first_name'])

    def test_put_patient_user_profile(self):
        """
        Ensure it can update Patient's profile
        """
        new_allergies = ['Polén', 'Penicilina']
        new_fields = {
            'location': 'Monterrey',
            'sex': SexTypes.OTHER,
            'allergies': new_allergies,
            'blood_type': 'O+'
        }
        response = self.client.put(self.url, new_fields, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        location = response.data['data']['location']
        sex = response.data['data']['sex']
        allergies = response.data['data']['allergies']
        blood_type = response.data['data']['blood_type']

        self.assertEqual(location, new_fields['location'])
        self.assertEqual(sex, new_fields['sex'])
        self.assertEqual(allergies, new_allergies)
        self.assertEqual(blood_type, new_fields['blood_type'])

    def test_put_wrong_patient_user_profile(self):
        """
        Ensure it can fail when updatieng patient with invalid payload
        """
        new_allergies = ['Polén', 'Penicilina']
        new_fields = {
            'location': 'Monterrey',
            'sex': SexTypes.OTHER,
            'allergies': new_allergies,
            'blood_type': new_allergies
            }
        response = self.client.put(self.url, new_fields, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_wrong_patient_profile_sex(self):
        """
        Ensure 'sex' is validated
        """
        new_fields = {
            'location': 'Monterrey',
            'sex': 'something else'
            }
        response = self.client.put(self.url, new_fields)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_wrong_patient_profile_data(self):
        """
        Ensure patient can't write data that is only for medic
        """
        new_fields = {
            'location': 'Monterrey',
            'license': '12345678',
            'specialties': []
            }
        response = self.client.put(self.url, new_fields, format='json')
        self.assertFalse('medic' in response.data['data'])

class MedicProfileTests(APITestCase):
    url = reverse('profile')
    
    def setUp(self):
        self.data = {
            'email': 'test@mail.com',
            'first_name': 'Dr Raul',
            'last_name': 'Castellanos',
            'location': 'San Luis Potosi',
            'sex': SexTypes.FEMALE,
            'type': ['MED']
        }
        self.user = Medic.objects.create(**self.data)
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)

    def test_get_medic_profie(self):
        """
        Ensure it can retrieve Medic's info
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['first_name'], self.data['first_name'])

    def test_put_medic_profile(self):
        """
        Ensure it can update medics's profile
        """
        new_fields = {
            'location': 'Monterrey',
            'license': '12345678',
            'specialties': []
        }
        response = self.client.put(self.url, new_fields)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        location = response.data['data']['location']
        license = response.data['data']['license']
        self.assertEqual(location, new_fields['location'])
        self.assertEqual(license, new_fields['license'])
