from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import Condition, User


class DoctoryUserAdmin(UserAdmin):
  model = User
  list_display = ('id', 'email', 'is_staff', 'is_active',)
  list_filter = ('email', 'is_staff', 'is_active',)
  fieldsets = (
      (None, {'fields': ('email', 'password', 'first_name', 'last_name', 'type')}),
      ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser')}
      ),
  )
  search_fields = ('id', 'email')
  ordering = ('id', 'email')


class ConditionAdmin(admin.ModelAdmin):
  pass

admin.site.register(User, DoctoryUserAdmin)
admin.site.register(Condition, ConditionAdmin)