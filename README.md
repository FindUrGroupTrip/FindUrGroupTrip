# FindUrGroupTrip
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![fugt backend ci](https://github.com/FindUrGroupTrip/FindUrGroupTrip/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/FindUrGroupTrip/FindUrGroupTrip/actions/workflows/backend-ci.yml)
[![fugt react ci](https://github.com/FindUrGroupTrip/FindUrGroupTrip/actions/workflows/react-ci.yml/badge.svg)](https://github.com/FindUrGroupTrip/FindUrGroupTrip/actions/workflows/react-ci.yml)

[![Tag](https://img.shields.io/badge/Tag-v0.1-blue)](https://github.com/FindUrGroupTrip/FindUrGroupTrip/tree/v0.1)

Prérequis d'installation :

    - Python au moins la version 3.9.0 : https://www.python.org/downloads/
    - Mysql Workbench : https://dev.mysql.com/downloads/workbench/
    (PS : Des fois problème de connection serveur Mysql pour cela retélécharger Mysql Community Server : https://dev.mysql.com/downloads/mysql/)
    - Un IDE au choix (Visual Studio Code, Pycharm...)
    - Télécharger Node.js pour React : https://nodejs.org/en
    
    

Au choix mais de préférence créer un environnement virtuel :

    -Créer un répertoire pour le projet
    -Se placer dans le répertoire : cd le_nom_du_repertoire
    -Créer l'environnement virtuel : python –m venv FUGTenv
    -Pour activer l'environnement se placer dans FUGTenv\Scripts :  cd FUGTenv\Scripts
    -Puis taper la commande : activate


Les installations pip à faire (dans l'environnement ou bien directement dans "C:/") :

    pip install django (installation de django)
    pip install --upgrade django (mettre la dernière version de Django)

    pip install mysql-connector-python (Pour faire la mise en relation de python à mysql)
    pip install djangorestframework (Pour créer l'APIRest et faire le lien entre le back et le front)
    pip install django-cors-headers (Pour autoriser certaines API comme la récuperation d'une image stockée dans le back)

Installation nmp à faire :

    -npm install react-scripts (Pour installer les scripts ->
                                    pouvoir utiliser les scripts comme npm start, npm run ...)


Récuperation du code sur git :

    git init (si besoin)
    git clone https://github.com/FindUrGroupTrip/FindUrGroupTrip.git

Configuration nécessaire sur le code :

    -Enregistrer l'application dans le fichier settings.py :

        INSTALLED_APPS = [
            "django.contrib.admin",
            …
            "django.contrib.staticfiles",
            "FUGTApp",
        ]

    -Maintenant configurer le fichier settings.py pour connecter l'application à la base de données

        DATABASES = {
            'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'dbPSI', // nom de la base
            'USER': 'user_dB_PSI', // l’utilisateur MySql qui a les droits sur la base
            'PASSWORD': 'mot_de_passe',
            'HOST': '127.0.0.1', // adresse du serveur
            'PORT': '3306', // port du serveur
            },
            'sqlite': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }

-Migration des données de Django vers Mysql :

    python manage.py makemigrations
    python manage.py migrate

-Créer un administrateur pour la page Admin de l'application :

    python manage.py createsuperuser

-Petite commande pour vérifier l'état : 

    python manage.py check

-Maintenant pour lancer le "build" (lancer le serveur):

    python manage.py runserver

-Pour lancer React 

    Se placer dans le répertoire du front
    Lancer cette commande : npm start
    
