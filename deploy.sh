#!/bin/bash

# Wait 10s to be sure network + Git is ready
sleep 10

cd /home/sotherma/sotherma-contrats

# Pull code
git pull origin main

# Remove old container
docker rm -f react-ui

# Rebuild and run
docker build -t sotherma-contracts .
docker run -d -p 5173:3000 --restart always --name react-ui sotherma-contracts

# Remove old images
docker system prune -af

# Reload Nginx to apply changes
sudo systemctl reload nginx
