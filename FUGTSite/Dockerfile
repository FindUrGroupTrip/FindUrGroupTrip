# Utiliser l'image officielle de Python comme image de base
FROM python:3.8-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier des dépendances dans le répertoire de travail
COPY requirements.txt .

# Installer les dépendances système nécessaires pour mysqlclient
RUN apt-get update \
    && apt-get install -y default-libmysqlclient-dev build-essential

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code source de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application tourne
EXPOSE 8000

# Démarrer l'application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
