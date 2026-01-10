# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy static assets that aren't processed by Vite
# Using shell form to handle potentially missing directories
COPY index.html /usr/share/nginx/html/
COPY scripts /usr/share/nginx/html/scripts
COPY styles /usr/share/nginx/html/styles

# Create placeholder directories for assets referenced in index.html
RUN mkdir -p /usr/share/nginx/html/css \
    && mkdir -p /usr/share/nginx/html/imgs \
    && mkdir -p /usr/share/nginx/html/locales \
    && mkdir -p /usr/share/nginx/html/public/styles \
    && mkdir -p /usr/share/nginx/html/public/scripts

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
