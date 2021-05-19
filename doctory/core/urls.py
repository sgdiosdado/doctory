from django.urls import path

from .views.views_condition import ListConditions, ConditionDetail
from .views.views_background import ListBackgroundSubtypes, ListBackgroundTypes
from .views.views_specialty import ListSpecialties
from .views.views_profile import Profile
from .views.views_authentication import Signup, Login, ChangePassword, Types
from .views.views_medic import ListPatients
from .views.views_share import ShareHistory
from .views.views_sharedWith import ListMedics, MedicDetail

urlpatterns = [
    path('conditions/', ListConditions.as_view(), name='conditions'),
    path('conditions/<int:condition_id>/', ConditionDetail.as_view(), name='condition'),
    path('background-types/', ListBackgroundTypes.as_view(), name='background_types'),
    path('background-subtypes/', ListBackgroundSubtypes.as_view(), name='background_subtypes'),
    path('specialties/', ListSpecialties.as_view(), name='specialties'),
    path('patients/', ListPatients.as_view(), name='patients'),
    path('signup/', Signup.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login'),
    path('profile/', Profile.as_view(), name='profile'),
    path('change-password/', ChangePassword.as_view(), name='change_password'),
    path('type/', Types.as_view(), name='type'),
    path('share-history/', ShareHistory.as_view(), name='share'),
    path('shared-with/', ListMedics.as_view(), name='shared_with'),
    path('shared-with/<int:medic_id>/', MedicDetail.as_view(), name='shared_medic'),
]
