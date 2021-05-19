from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from .models import BackgroundSubtype, BackgroundType, Condition, User, Patient, Medic, Specialty
from .utils import UserTypes


class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message='This email is already in use')])
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)
    user_type = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Password fields didn\'t match.'})
        return attrs

    def create(self, validated_data):
        user_types = {
            UserTypes.PATIENT: Patient,
            UserTypes.MEDIC: Medic
        }

        user_model = user_types[validated_data['user_type']]

        user = user_model.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            type=[validated_data['user_type']]
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


class PatientProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Patient
        fields = ['id', 'email', 'first_name', 'last_name', 'type', 'location', 'sex', 'dob', 'blood_type', 'allergies']
        read_only_fields = ['email']


class MedicProfileSerializer(serializers.ModelSerializer):
    specialties = SpecialtySerializer(many=True, required=False)
    class Meta:
        model = Medic
        fields = ['id', 'email', 'first_name', 'last_name', 'type', 'location', 'sex', 'dob', 'blood_type', 'allergies', 'license', 'specialties']
        read_only_fields = ['email']


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


class ShareSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255, write_only=True, required=True)
