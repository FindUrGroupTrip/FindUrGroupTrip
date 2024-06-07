# Étape 1: Utiliser une image de base avec Node
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les autres fichiers du projet
COPY . .

# Construire l'application
RUN npm run build

# Étape 2: Servir l'application avec un serveur web léger
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
