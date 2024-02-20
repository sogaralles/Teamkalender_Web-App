#Compile and build

# Use official node image as the base image
FROM node:latest as build
# Set working directory
WORKDIR /usr/local/app
# Add source code
COPY ./ /usr/local/app
# Install all dependencies
RUN npm install --force
# Generate build
RUN npm run build
# Output


#Serve Web-App with nginx server

# Use official nginx image as base image
FROM nginx:latest
# Copy build output to replace default nginx contents
COPY --from=build /usr/local/app/dist/teamkalender_web-app /usr/share/nginx/html
# Expose port
EXPOSE 80