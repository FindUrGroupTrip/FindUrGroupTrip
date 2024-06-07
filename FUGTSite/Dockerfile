# Base image
FROM python:3.8-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers requis pour installer les dépendances
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code source de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel votre app va tourner
EXPOSE 8000

# Commande pour démarrer votre application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
