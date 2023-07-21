# Utilisez l'image officielle de Node.js 18.15.0
FROM node:18.15.0

# Créez un répertoire pour votre application
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installez les dépendances de votre projet
RUN npm install

# Copiez le reste de l'application
COPY . .

# Exposez le port sur lequel votre application va s'exécuter
EXPOSE 3001

# Démarrez l'application
CMD [ "npm", "start" ]
