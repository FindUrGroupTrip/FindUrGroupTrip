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
from FUGTApp.views import  ActiviteListView , CreerActiviteView, serve_static_image,\
    get_activite_details,reserve_activity, CreerActiviteReservation,add_note_to_activite,\
    reservations_par_activite_api, get_reservations_by_activite, activite_list
from FUGTApp.views import HelloWorldView, CreerActiviteView, \
    get_activite_details, reserve_activity, CreerActiviteReservation,activite_list
from django.contrib.staticfiles.views import serve
from django.conf import settings
from django.conf.urls.static import static

from FUGTApp.views import get_vacations, ValiderVacationsView, contact_view,contact_requests_api, AddWhatsapp, UpdateWhatsapp,GetWhatsapp, AddFeedbackimage, GetFeedbackimage
from FUGTApp.views import (get_vacations, ValiderVacationsView,
                           QuestionListView, AnswerListView, AnswerDetailView,
                           QuestionDetailView, AnswerCreateView,choropleth_medals_by_country_json,
                           evolution_participants_olympics_json,medals_bar_animation_json,top15_country_discipline_json,medals_evolution_top10_json)

from FUGTApp.views import user_reservations, add_user_reservation, remove_user_reservation, activity_options, toggle_favorite,heatmap_medals, country_discipline_heatmap, country_discipline_barplot, country_discipline_heatmap_json,sunburst_medals_season_json,scatter_medals_by_discipline_country_year_json


router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/activites/<int:activity_id>/reserve/', reserve_activity, name='reserve_activity'),
    path('api/activites/<int:id>/', get_activite_details, name='get_activite_details'),
    path('static/FUGTLogo.png', views.serve_static_image, name='serve_static_image'),
    path('api/activites/', activite_list, name='activite_list'),
    path('api/medals/evolution-participants-json/', evolution_participants_olympics_json),
    path('api/medals/medals-bar-animation-json/', medals_bar_animation_json, name='medals_bar_animation_json'),

    path('api/medals/evolution-top10-json/', views.medals_evolution_top10_json, name='medals_evolution_top10_json'),
    path('api/creer_activite/', CreerActiviteView.as_view(), name='creer_activite'),
    path('api/creer_activite_reservation/', CreerActiviteReservation.as_view(), name='creer_activite_reservation'),
    path('static/<path:path>', serve),
    path('api/activites/<int:activity_id>/add-note/', add_note_to_activite.as_view(), name='add_note_to_activite'),
    path('api/v1/', include('FUGTApp.auth.auth_urls')),
    path('api/reservations_par_activite/<str:id_activite>/', reservations_par_activite_api, name='reservations_par_activite_api'),
    path('api/reservations/<str:id_activite>/', get_reservations_by_activite, name='get_reservations_by_activite'),
    path('api/activites/<int:id>/', get_activite_details, name='get_activite_details'),
    path('api/medals/top15-country-discipline-json/', top15_country_discipline_json, name='top15_country_discipline_json'),

    path('api/vacations/', get_vacations, name='get_vacations'),
    path('api/valider-vacations/', ValiderVacationsView.as_view(), name='valider_vacations'),
    path('api/questions/', QuestionListView.as_view(), name='question-list'),
    path('api/questions/<int:pk>/', QuestionDetailView.as_view(), name='question-detail'),
    path('api/answers/', AnswerListView.as_view(), name='answer-list'),
    path('api/answers/<int:pk>/', AnswerDetailView.as_view(), name='answer-detail'),
    path('api/answers/create/', AnswerCreateView.as_view(), name='answer-create'),

    path('contact/', contact_view, name='contact_view'),
    path('api/contact-requests/', contact_requests_api, name='contact_requests_api'),
    path('api/activites/<int:activity_id>/update_whatsapp/', UpdateWhatsapp.as_view(), name='update_whatsapp'),
    path('api/activites/<int:activity_id>/AddWhatsapp/', AddWhatsapp.as_view(), name='add_whatsapp'),
    path('api/activites/<int:idactivite>/get_whatsapp/', GetWhatsapp.as_view(), name='get_whatsapp'),

    path('api/activites/<int:activity_id>/AddFeedbackimage/', AddFeedbackimage.as_view(), name='AddFeedbackimage'),
    path('api/activites/<int:idactivite>/GetFeedbackimage/', GetFeedbackimage.as_view(), name='GetFeedbackimage'),
    path('api/medals/sunburst-season-json/', sunburst_medals_season_json),
    path('api/medals/choropleth-medals-country-json/', choropleth_medals_by_country_json),

    #nouvelle version to do list
    path('api/user-reservations/', user_reservations, name='user_reservations'),
    path('api/add-user-reservation/', add_user_reservation, name='add_user_reservation'),
    path('api/remove-user-reservation/<int:reservation_id>/', remove_user_reservation, name='remove_user_reservation'),
    path('api/activity-options/', activity_options, name='activity_options'),
    path('api/toggle-favorite/<int:reservation_id>/', toggle_favorite, name='toggle-favorite'),
    path('api/medals/heatmap/', heatmap_medals, name='heatmap_medals'),
    path('api/medals/country-discipline-heatmap/', country_discipline_heatmap),
    path('api/medals/country-discipline-barplot/', country_discipline_barplot),
    path('api/medals/country-discipline-heatmap-json/', country_discipline_heatmap_json),
    path('api/medals/scatter-discipline-country-year-json/', scatter_medals_by_discipline_country_year_json),
    path('api/medals/medals-evolution-top10-json/', views.medals_evolution_top10_json, name='medals_evolution_top10_json'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
