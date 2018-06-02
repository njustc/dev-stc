# deploy script. Run this to deploy.
# Instruction:
#######################
# $ chmod +x deploy.sh
# $ ./deploy.sh
#######################
PROJECT_PATH = '/home/stc-dev/develop/dev-stc/server'


echo "Start to  pull source code"
cd $PROJECT_PATH
git pull

echo "Start to deploy back-end"
cd ./server
echo "Start to clean and pacakge "
mvn clean package -DskipTests

echo "Start to update database"
docker exec -i mymysql mysql -uroot -pmysql stc < framework.sql

echo "Start to deploy "
ps aux | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
nohup java -jar target/framework-1.0.0.jar &
