from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from core.models import Medic, Patient, PatientMedic
from core.utils import SexTypes

def authenticate(client, token_key):
  client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')

class ShareHistoryTests(APITestCase):
  url = reverse('share')

  def setUp(self):
    self.user = Patient.objects.create(email='test@mail.com')
    self.token = Token.objects.get(user=self.user)
    self.client = APIClient()
    authenticate(self.client, self.token.key)
    
  
  def test_share_history(self):
    """
    Ensure it can create a new PatientMedic relationship.
    """
    medic_user =  Medic.objects.create(email='medictest@mail.com')
    data = {
      'email': 'medictest@mail.com'
    }
    
    response = self.client.post(self.url, data)
    
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(PatientMedic.objects.get(patient=self.user.more, medic=medic_user.more).medic, medic_user.more)

  def test_fail_share_history(self):
    """
    Ensure it can create a new PatientMedic relationship with nonexistent email.
    """
    data = {
      'email': 'medictest@mail.com'
    }
    
    response = self.client.post(self.url, data)
    
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
  
  def test_fail_no_data_share_history(self):
    """
    Ensure it can create a new PatientMedic relationship with nonexistent email.
    """
    data = {}
    
    response = self.client.post(self.url, data)
    
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
  
  def test_fail_invalid_data_share_history(self):
    """
    Ensure it can create a new PatientMedic relationship with invalid email address.
    """
    data = {
      'email': 'medictest'
    }
    
    response = self.client.post(self.url, data)
    
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
