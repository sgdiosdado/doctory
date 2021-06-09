from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from core.models import Patient, Condition
from core.serializers import ConditionSerializer


def authenticate(client, token_key):
    client.credentials(HTTP_AUTHORIZATION=f'Token {token_key}')

class ListConditionsTests(APITestCase):
    fixtures = [
        'core/fixtures/0001_BackgroundTypes.json',
        'core/fixtures/0002_BackgroundSubtypes.json'
        ]
    
    url = reverse('conditions')

    def setUp(self):
        self.user = Patient.objects.create(email='test@mail.com')
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)

    def test_create_condition(self):
        """
        Ensure it can create a new condition object.
        """
        data = {
            'name': 'Diabetes',
            'description': 'Diabetes type 2',
            'date_of_diagnosis': '2017-01-18',
            'background_subtype': 2
            }
        response = self.client.post(self.url, data)
        created_condition = self.user.conditions.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ConditionSerializer(created_condition).data, response.data['data'])
    
    def test_fail_create_condition(self):
        """
        Ensure it can fail when creating condition with invalid payload
        """
        data = {
            'name': 'Diabetes',
            'description': 'Diabetes type 2',
            'date_of_diagnosis': '2017-01-18',
            }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(response.data['errors'] is not None)

    def test_list_patient_conditions(self):
        """
        Ensure it can list all patient's conditions
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.conditions.count(), len(response.data['data']))


class ConditionDetailTests(APITestCase):
    fixtures = [
        'core/fixtures/0001_BackgroundTypes.json',
        'core/fixtures/0002_BackgroundSubtypes.json'
        ]

    def setUp(self):
        self.user = Patient.objects.create(email='test@mail.com')
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()
        authenticate(self.client, self.token.key)

        dummy_condition = {
            'name': 'Condition 1',
            'description': 'Some description',
            'date_of_diagnosis': '2017-01-18',
            'background_subtype': 2
            }
        serializer = ConditionSerializer(data=dummy_condition)
        serializer.is_valid()
        condition = serializer.save(patient=self.user)
        self.url = reverse('condition', kwargs={'condition_id': condition.id})

    def test_retrieve_condition(self):
        """
        Ensure it can retrieve a patient's condition
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_retrieve_forbidden_condition(self):
        """
        Ensure it can only retrieve own conditions
        """
        another_user =  Patient.objects.create(email='anothertest@mail.com')
        dummy_condition = {
            'name': 'Condition 2',
            'description': 'Some other description',
            'date_of_diagnosis': '2017-12-20',
            'background_subtype': 3
            }
        serializer = ConditionSerializer(data=dummy_condition)
        serializer.is_valid()
        serializer.save(patient=another_user)

        response = self.client.get(reverse('condition', kwargs={'condition_id': 2}))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_update_condition(self):
        """
        Ensure update condition if payload is correct
        """
        data = {
            'name': 'Condition 1',
            'description': 'Some updated description',
            'date_of_diagnosis': '2017-01-18',
            'background_subtype': 2
            }
        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_fail_update_condition(self):
        """
        Ensure failing update when payload is incomplete
        """
        data = {
            'name': 'Condition 1',
            'description': 'Some updated description',
            'background_subtype': 2
            }
        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST) 
    
    def test_update_forbidden_condition(self):
        """
        Ensure a user cannot update another's condition
        """
        another_user =  Patient.objects.create(email='anothertest@mail.com')
        dummy_condition = {
            'name': 'Condition 2',
            'description': 'Some other description',
            'date_of_diagnosis': '2017-12-20',
            'background_subtype': 3
            }
        serializer = ConditionSerializer(data=dummy_condition)
        serializer.is_valid()
        condition = serializer.save(patient=another_user)

        data = {
            'name': 'Condition 2',
            'description': 'Some updated description',
            'date_of_diagnosis': '2017-01-18',
            'background_subtype': 3
            }
        response = self.client.put(reverse('condition', kwargs={'condition_id': condition.id}), data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_condition(self):
        """
        Ensure a condition can be deleted
        """
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_delete_forbidden_condition(self):
        """
        Ensure a condition cannot be deleted by a user different from the owner
        """
        another_user =  Patient.objects.create(email='anothertest@mail.com')
        dummy_condition = {
            'name': 'Condition 2',
            'description': 'Some other description',
            'date_of_diagnosis': '2017-12-20',
            'background_subtype': 3
            }
        serializer = ConditionSerializer(data=dummy_condition)
        serializer.is_valid()
        condition = serializer.save(patient=another_user)

        response = self.client.delete(reverse('condition', kwargs={'condition_id': condition.id}))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
