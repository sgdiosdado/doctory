from core.utils import SexTypes
from django.contrib.postgres import fields
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from .models import BackgroundSubtype, BackgroundType, Condition, MedicMore, PatientMore, User, Specialty


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message='This email is already in use')])
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password1', 'password2',)
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Password fields didn\'t match.'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password1'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255, write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError({'credentials': 'A user with this email and password is not found.'})
        update_last_login(None, user)
        token_key = Token.objects.get(user=user)
        return {'token': token_key}


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ['id','name']


class MedicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicMore
        fields = ['license', 'specialties']


class PatientProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PatientMore
        fields = ['blood_type', 'allergies']


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'type', 'location', 'sex', 'dob']
        read_only_fields = ['email']


class ProfileSerializer(serializers.ModelSerializer):
    patient = PatientProfileSerializer(source='patientmore')
    medic = MedicProfileSerializer(source='medicmore')

    class Meta:
        FIELDS = ['id', 'email', 'first_name', 'last_name', 'type', 'location', 'sex', 'dob', 'patient', 'medic']
        model = User
        fields = FIELDS
        read_only_fields = FIELDS


class ChangePasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField()
    password2 = serializers.CharField()

    def validate(self, data):
        """
        Validates that passwords match
        """
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'passwords': ['Passwords don\'t match']})
        return data


class ConditionSerializer(serializers.ModelSerializer):
    background_subtype_name = serializers.CharField(source='background_subtype.name', read_only=True)
    class Meta:
        model = Condition
        fields = ['id', 'name', 'description', 'patient', 'date_of_diagnosis', 'background_subtype', 'background_subtype_name']
        read_only_fields = ['id', 'patient']
    
    def validate(self, data): 
        """
        Check that background_subtype is not null
        """
        if 'background_subtype' not in data:
            raise serializers.ValidationError({'background_subtype': ['This field is required']})
        return data


class BackgroundSubtypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackgroundSubtype
        fields = ['id', 'name', 'description']
        read_only_fields = ['id', 'name', 'description']


class BackgroundTypeSerializer(serializers.ModelSerializer):
    background_subtypes = BackgroundSubtypeSerializer(many=True)

    class Meta:
        model = BackgroundType
        fields = ['id', 'name', 'description', 'background_subtypes']
        read_only_fields = ['id', 'name', 'description', 'backgroundsubtypes']