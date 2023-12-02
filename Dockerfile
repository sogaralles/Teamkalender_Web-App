#Compile and build

# Use official node image as the base image
FROM node:latest as build
# Set working directory
WORKDIR /usr/local/app
# Add source code
COPY ./ /usr/local/app
# Install all dependencies
RUN npm install
# Generate build
RUN npm run build
# Output


#Serve Web-App with nginx server

# Use official nginx image as base image
FROM nginx:latest
# Copy build output to replace default nginx contents
COPY --from=build /usr/local/app/dist/team-kalender /usr/share/nginx/html
# Expose port
EXPOSE 80

# Verwende ein Basisimage, das Node.js enthält
#2FROM node:latest AS build

# Setze das Arbeitsverzeichnis innerhalb des Containers
#2WORKDIR /app

# Kopiere das Package.json und den Package-lock.json in das Arbeitsverzeichnis
#2COPY package*.json ./

# Installiere Abhängigkeiten
#2RUN npm install

# Kopiere den Rest des Codes in das Arbeitsverzeichnis
#2COPY . .

# Erstelle die Angular-App
#2RUN npm run build

# Nginx als Webserver für die Angular-App verwenden
#2FROM nginx:latest

# Kopiere den erstellten Build in den Nginx-Server
#2COPY --from=build /app/dist/* /usr/share/nginx/html

# Port 80 öffnen, um die App bereitzustellen
#2EXPOSE 80

# Starte den Nginx-Server beim Containerstart
#2CMD ["nginx", "-g", "daemon off;"]

