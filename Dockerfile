# Use an official Node runtime as a parent image
FROM node:18.14.2-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the Angular app
RUN npm run build --omit=dev

# Use a smaller, more minimal runtime for the production image
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

# Copy the built app from the build container to the production container
COPY --from=build /app/dist/front-end-sap /usr/share/nginx/html

# Expose port 80, 443
EXPOSE 80 443