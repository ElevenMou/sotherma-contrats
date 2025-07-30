#!/bin/bash
sleep 10
cd /home/sotherma/sotherma-contrats
git pull origin main
docker rm -f react-ui

# Clear cache and rebuild
docker build --no-cache -t sotherma-contracts .
docker run -d -p 3010:3000 --restart always --name react-ui sotherma-contracts