from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from .models import Patient, BackgroundSubtype
from .serializers import ConditionSerializer


class ConditionTests(APITestCase):
    fixtures = ['core/fixtures/0001_BackgroundTypes.json', 'core/fixtures/0002_BackgroundSubtypes.json']

    def create_dummy_conditions(self, user):
        user.conditions.create(name='Cond 1', description='Desc 1', background_subtype=BackgroundSubtype.objects.get(id=1), date_of_diagnosis=timezone.now())
        user.conditions.create(name='Cond 2', description='Desc 2', background_subtype=BackgroundSubtype.objects.get(id=2), date_of_diagnosis=timezone.now())
        user.conditions.create(name='Cond 3', description='Desc 3', background_subtype=BackgroundSubtype.objects.get(id=3), date_of_diagnosis=timezone.now())

    def setUp(self):
        self.user = Patient.objects.create(username='test')
        token = Token.objects.create(user=self.user)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user, token=token)
        self.create_dummy_conditions(self.user)

    def test_create_condition(self):
        """
        Ensure it can create a new condition object.
        """
        url = reverse('conditions')
        data = {
            'name': 'Diabetes',
            'description': 'Diabetes type 2',
            'date_of_diagnosis': '2017-01-18T00:00',
            'background_subtype': 2
            }
        response = self.client.post(url, data)
        created_condition = Patient.objects.get(username='test').conditions.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ConditionSerializer(created_condition).data, response.data['data'])
    
    def test_fail_create_condition(self):
        url = reverse('conditions')
        data = {
            'name': 'Diabetes',
            'description': 'Diabetes type 2',
            'date_of_diagnosis': '2017-01-18T00:00',
            }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(response.data['errors'] is not None)

    def test_list_patient_conditions(self):
        """
        Ensure it can list all patient's conditions
        """
        url = reverse('conditions')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.conditions.count(), len(response.data['data']))
    
