from django.urls import path

from .views.views_condition import ListConditions, ConditionDetail
from core.views.views_authentication import Signup, Login

urlpatterns = [
    path('conditions/', ListConditions.as_view(), name='conditions'),
    path('conditions/<int:condition_id>/', ConditionDetail.as_view(), name='condition'),
    path('signup/', Signup.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login')
]
