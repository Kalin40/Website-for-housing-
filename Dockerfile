# Build stage - serve static files with a lightweight web server
FROM node:18-alpine AS base

WORKDIR /app

# Copy website files
COPY index.html style.css script.js ./

# Expose port 3000
EXPOSE 3000

# Use a simple HTTP server to serve static files
RUN npm install -g http-server

# Start the server
CMD ["http-server", ".", "-p", "3000", "-c-1"]
