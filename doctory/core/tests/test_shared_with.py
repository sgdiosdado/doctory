from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from core.models import Medic, Patient, PatientMedic


def authenticate(client, token_key):
    client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')


class SharedWitTests(APITestCase):
    url = reverse('shared_with')

    def setUp(self):
        self.user = Patient.objects.create(email='test@mail.com')
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)


    def test_shared_with(self):
        """
        Ensure it can retrieve elements from PatientMedic relationship.
        """
        medic_user = Medic.objects.create(email='medictest@mail.com')
        data = {
            'email': 'medictest@mail.com'
        }

        _ = self.client.post('share', data)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_remove_elements_shared_with(self):
        """
        Ensure the PatientMedic relationship can be removed.
        """

        medic_user = Medic.objects.create(email='medictest@mail.com')
        data = {
            'email': 'medictest@mail.com'
        }

        _ = self.client.post('share', data)
        #print(reverse('shared_medic', kwargs={'medic_id': medic_user.more.pk}))
        #print(medic_user.pk)
        response = self.client.delete(reverse('shared_medic', kwargs={'medic_id': medic_user.pk}))

        self.assertEqual(self.user.patientmore.medics.all().exists(), False)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    