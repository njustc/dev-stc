#!/bin/bash
# deploy script. Run this to deploy.
# Instruction:
#######################
# $ chmod +x deploy.sh
# $ ./deploy.sh
#######################

PROJECT_PATH='/home/stc-dev/develop/dev-stc/'


echo "Start to pull source code"
cd $PROJECT_PATH
git pull

echo "Start to deploy back-end"
cd ./server
echo "1. start to clean and pacakge "
mvn clean package -DskipTests

echo "2. Start to update database"
docker exec -i mymysql mysql -uroot -pmysql stc < framework.sql

echo "3. Start to deploy "
ps aux | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
nohup java -jar target/framework-1.0.0.jar &
echo "Finish deploying back-end"

echo "Start to deploy front-end and swagger"
service nginx stop
cd ../client/framework-webclient/
rm -rf /usr/share/nginx/dist/
\cp -rf ./dist/ /usr/share/nginx/
cd ../../api/
\cp -f ./swagger.json /usr/share/nginx/dist/
\cp -rf ./swagger-ui-dist/ /usr/share/nginx/dist/
service nginx start
echo "Finish deploying front-end and swagger"
