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
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from FUGTApp import views
from FUGTApp.views import HelloWorldView, ActiviteListView , CreerActiviteView, serve_static_image,\
    get_activite_details,reserve_activity, CreerActiviteReservation,add_note_to_activite
from django.contrib.staticfiles.views import serve
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/activites/<int:activity_id>/reserve/', reserve_activity, name='reserve_activity'),
    path('api/v1/', include('FUGTApp.auth.auth_urls')),
    path('api/hello/', HelloWorldView.as_view(), name='hello-world'),
    path('static/FUGTLogo.png', views.serve_static_image, name='serve_static_image'),
    path('api/activites/', ActiviteListView.as_view(), name='activite-list'),
    path('api/creer_activite/', CreerActiviteView.as_view(), name='creer_activite'),
    path('api/creer_activite_reservation/', CreerActiviteReservation.as_view(), name='creer_activite_reservation'),
    path('static/<path:path>', serve),
    path('api/activites/<int:id>/', get_activite_details, name='get_activite_details'),
    path('api/activites/${activite_id}/add-note/', add_note_to_activite, name='add-note')

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)