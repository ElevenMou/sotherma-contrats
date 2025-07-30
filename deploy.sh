#!/bin/bash

# Stop and remove old container
docker rm -f react-ui

# Pull latest changes
git pull origin main

# Rebuild image
docker build -t sotherma-contracts .

# Run container again on clean port
docker run -d -p 5173:3000 --restart always --name react-ui sotherma-contracts
