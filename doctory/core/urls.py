from django.urls import path

from .views.views_condition import ListConditions, ConditionDetail
from .views.views_background import ListBackgroundSubtypes, ListBackgroundTypes
from .views.views_specialty import ListSpecialties
from .views.views_profile import Profile
from core.views.views_authentication import Signup, Login

urlpatterns = [
    path('conditions/', ListConditions.as_view(), name='conditions'),
    path('conditions/<int:condition_id>/', ConditionDetail.as_view(), name='condition'),
    path('background-types/', ListBackgroundTypes.as_view(), name='background_types'),
    path('background-subtypes/', ListBackgroundSubtypes.as_view(), name='background_subtypes'),
    path('specialties/', ListSpecialties.as_view(), name='specialties'),
    path('signup/', Signup.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login'),
    path('profile/', Profile.as_view(), name='profile'),
]
