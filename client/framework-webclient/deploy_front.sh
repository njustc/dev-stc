#!/bin/bash
docker cp ./dist mynginx:/usr/share/nginx/
docker exec -it mynginx nginx -s reload
