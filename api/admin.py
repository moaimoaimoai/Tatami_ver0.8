from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from . import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ()}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Profile)
admin.site.register(models.MonoPage)
admin.site.register(models.MonoPost)
admin.site.register(models.MonoComment)
admin.site.register(models.Message)
admin.site.register(models.FriendRequest)
admin.site.register(models.UserIntPage)
admin.site.register(models.UserIntPost)
admin.site.register(models.UserIntComment)
admin.site.register(models.UserIntAttribute)
admin.site.register(models.PageAttribute)
admin.site.register(models.FollowingPage)
admin.site.register(models.AffiliateLinks)
admin.site.register(models.UserRecommendedUser)
admin.site.register(models.UserRecommendedPage)
admin.site.register(models.OwningPage)
