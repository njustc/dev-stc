#!/bin/bash

HOST_IP='121.42.175.137'

echo "Change host name to stcip"
sed -i "s/localhost/$HOST_IP/g" src/services/common.js

echo "Build dist"
npm install
npm run build

echo "Change host name back to localhost"
sed -i "s/$HOST_IP/localhost/g" src/services/common.js

#echo "Start to deploy"
#docker cp ./dist mynginx:/usr/share/nginx/
#docker exec -it mynginx nginx -s reload
