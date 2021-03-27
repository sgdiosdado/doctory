from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import Condition, User


class ConditionAdmin(admin.ModelAdmin):
  pass

admin.site.register(User, UserAdmin)
admin.site.register(Condition, ConditionAdmin)