from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import User


class SignupTests(APITestCase):
    url = reverse('signup')
    
    def test_signup(self):
        """
        Ensure an anonymous user can sign up
        """
        data = {
            'email': 'test@mail.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'password1': 'MyVeryStrongPassword@',
            'password2': 'MyVeryStrongPassword@',
            'user_type': 'PAT'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('token' in response.data['data'])
    
    def test_fail_signup(self):
        """
        Ensure an anonymous user cannot sign up with invalid payload
        """
        data = {
            'email': 'test@mail.com',
            'password1': 'MyVeryStrongPassword@',
            'password2': 'MyVeryStrongPassword@',
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginTests(APITestCase):
    url = reverse('login')

    def setUp(self):
        User.objects.create_user(email='test@mail.com', password='MyVeryStrongPassword@')

    def test_login(self):
        """
        Ensure a user can login
        """
        data = {
            'email': 'test@mail.com',
            'password': 'MyVeryStrongPassword@',
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data['data'])
    
    def test_fail_login(self):
        """
        Ensure a user cannot fail with invalid payload
        """
        data = {
            'email': 'test@mail.com',
            'password': 'SomeIncorrectPassword12345@$'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(response.data['errors'] is not None)
