# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Créer un fichier env-config.js avec l'URL de l'API
RUN echo "window.ENV = { API_URL: 'https://backend-250727144578.europe-west1.run.app' };" > ./public/env-config.js

# Build the app
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built assets from build stage
COPY --from=build /app/build .

# Create serve.json for configuring serve with React Router
RUN echo '{"rewrites": [{"source": "**", "destination": "/index.html"}]}' > serve.json

# Expose port
EXPOSE 8080

# Start the app with proper configuration for React Router
CMD ["sh", "-c", "serve -s . -l ${PORT:-8080}"]
