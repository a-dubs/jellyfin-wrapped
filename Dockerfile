# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY backend/package*.json ./backend/
COPY backend ./backend/
WORKDIR /app/backend
RUN npm ci
RUN npm run build

# Stage 3: Runtime
FROM node:20-alpine
WORKDIR /app

# Install Apache for frontend
RUN apk add --no-cache apache2

# Copy frontend build
COPY --from=frontend-builder /app/dist /usr/local/apache2/htdocs/

# Copy backend build
COPY --from=backend-builder /app/backend/dist ./backend/dist/
COPY --from=backend-builder /app/backend/package*.json ./backend/

# Install backend production dependencies
WORKDIR /app/backend
RUN npm ci --production

# Copy Apache config
COPY apache-config.conf /usr/local/apache2/conf/extra/apache-config.conf

# Enable necessary Apache modules and configure proxy
RUN sed -i \
    -e '/LoadModule substitute_module/s/^#//g' \
    -e '/LoadModule filter_module/s/^#//g' \
    -e '/LoadModule env_module/s/^#//g' \
    -e '/LoadModule proxy_module/s/^#//g' \
    -e '/LoadModule proxy_http_module/s/^#//g' \
    /usr/local/apache2/conf/httpd.conf && \
    echo "Include conf/extra/apache-config.conf" \
    >> /usr/local/apache2/conf/httpd.conf && \
    echo "PassEnv JELLYFIN_SERVER_URL" \
    >> /usr/local/apache2/conf/httpd.conf && \
    echo "PassEnv BACKEND_API_URL" \
    >> /usr/local/apache2/conf/httpd.conf && \
    echo "ProxyPass /api http://localhost:3000/api" \
    >> /usr/local/apache2/conf/httpd.conf && \
    echo "ProxyPassReverse /api http://localhost:3000/api" \
    >> /usr/local/apache2/conf/httpd.conf

# Create start script
WORKDIR /app
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 80
CMD ["./start.sh"]
