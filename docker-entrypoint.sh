#!/bin/sh
set -e

# Inject environment variables into index.html
if [ -n "$JELLYFIN_SERVER_URL" ]; then
    # Build the ENV script
    ENV_SCRIPT="<script>window.ENV = { JELLYFIN_SERVER_URL: '${JELLYFIN_SERVER_URL}'"
    
    if [ -n "$BACKEND_API_URL" ]; then
        ENV_SCRIPT="${ENV_SCRIPT}, BACKEND_API_URL: '${BACKEND_API_URL}'"
    fi
    
    ENV_SCRIPT="${ENV_SCRIPT} };</script>"
    
    # Inject into index.html
    sed -i "s|<head>|${ENV_SCRIPT}<head>|g" /usr/share/nginx/html/index.html
fi

# Start nginx
exec nginx -g "daemon off;"
