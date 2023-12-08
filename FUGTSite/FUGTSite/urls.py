"""FUGTSite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from FUGTApp import views
from FUGTApp.views import HelloWorldView, ActiviteListView , CreerActiviteView, serve_static_image, get_activite_details
from django.contrib.staticfiles.views import serve
from django.conf import settings
from django.conf.urls.static import static
from FUGTApp.views import get_vacations

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/', views.api_home, name='api-home'),
    path('api/hello/', HelloWorldView.as_view(), name='hello-world'),
    path('static/carte-interactive.jpeg', views.serve_static_image, name='serve_static_image'),
    path('api/activites/', ActiviteListView.as_view(), name='activite-list'),
    path('api/creer_activite/', CreerActiviteView.as_view(), name='creer_activite'),
    path('static/<path:path>', serve),
    path('api/activites/<int:idactivite>/', get_activite_details, name='get_activite_details'),
    path('api/update-nb-souhait/<int:idvacation>/', views.update_nb_souhait, name='update_nb_souhait'),
    path('api/vacations/', get_vacations, name='get_vacations'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
