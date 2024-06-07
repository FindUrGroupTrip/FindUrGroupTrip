# Étape 1 : Construire l'application React
FROM node:16 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir les fichiers statiques avec nginx
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port sur lequel l'application tourne
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
