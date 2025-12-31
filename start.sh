#!/bin/sh
# Start backend API server in background
cd /app/backend
node dist/server.js &

# Start Apache for frontend
httpd -D FOREGROUND
