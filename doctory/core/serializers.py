from rest_framework import serializers

from .models import Condition

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = ['id', 'name', 'description', 'patient', 'date_of_diagnosis', 'background_subtype']
        read_only_fields = ['id', 'patient']
    
    def validate(self, data): 
        """
        Check that background_subtype is not null
        """
        if 'background_subtype' not in data:
            raise serializers.ValidationError({'background_subtype': ['This field is required']})
        return data