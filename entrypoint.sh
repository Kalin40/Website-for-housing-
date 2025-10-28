#!/bin/sh

# Replace PORT in nginx config if provided
PORT=${PORT:-80}
sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/nginx.conf

# Start nginx
exec nginx -g 'daemon off;'
