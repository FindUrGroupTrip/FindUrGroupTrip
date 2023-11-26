from django.urls import path
from . import auth_views

urlpatterns = [
    path('register', auth_views.register_view, name='api_register'),
    path('login', auth_views.login_view, name='api_login'),
    path('logout', auth_views.logout_view, name='api_logout'),
    path('connected', auth_views.verify_token, name='connected'),
]
