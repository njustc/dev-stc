# deploy script. Run this to deploy.
# Instruction:
#######################
# $ chmod +x deploy.sh
# $ ./deploy.sh
#######################
echo "Start to  pull source code"
git pull
echo "Start to pacakge "
mvn clean package -DskipTests

echo "Start to update database"
docker exec -i mymysql mysql -uroot -pmysql stc < framework.sql

echo "Start to deploy "
ps aux | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
nohup java -jar target/framework-1.0.0.jar &
