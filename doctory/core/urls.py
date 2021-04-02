from django.urls import path

from .views.views_condition import ListConditions, ConditionDetail
from .views.views_background import ListBackgroundTypes
from .views.views_profile import Profile
from core.views.views_authentication import Signup, Login

urlpatterns = [
    path('conditions/', ListConditions.as_view(), name='conditions'),
    path('conditions/<int:condition_id>/', ConditionDetail.as_view(), name='condition'),
    path('background-types/', ListBackgroundTypes.as_view(), name='background_types'),
    path('signup/', Signup.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login'),
    path('profile/', Profile.as_view(), name='profile'),
]
