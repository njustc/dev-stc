# Server模块

## 后端部署步骤

### 准备工作
首先确保以下已安装

* docker
* maven
* java 1.8
* docker-compose.

如果没有docker-compose命令，可以用以下命令获取：
```
curl -L https://github.com/docker/compose/releases/download/1.21.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```
### 部署工作

1. 进入server目录,执行`docker-compose up -d`,启动 mysql 镜像。
> 执行第二条命令之前最好先等待十秒钟左右，使container有充分时间初始化

2. 执行命令
`docker exec -i mymysql mysql -uroot -pmysql stc < framework.sql `
   将framework.sql导入数据库stc中。
3. 执行`mvn clean package -DskipTests` 打包项目
4. 执行`mvn spring-boot:run` 启动项目up

### 数据库更新
在部分版本更新的时候，由于改变了数据库内表单结构，需要进行数据库更新操作，即重新导入framework.sql内容。使用以下命令将更新过的framework导入数据库内部.

 ```
 cd server
 docker exec -i mymysql mysql -uroot -pmysql stc < framework.sql 
 ```





### 命令解释
#### dokcer-compose
docker-compose 在此例中起到快速创建数据库的作用。我们可以看看docker-compose.yml文件

```
version: '3.2'

services:
  mysql:
    image: 'mysql:5.7.21'
    container_name: 'mymysql'
    ports:
      - '33006:3306'
    volumes:
      - '~/mnt/mysql/:/var/lib/mysql/'
    environment:
      - MYSQL_ROOT_PASSWORD=mysql
      - MYSQL_DATABASE=stc
    command: mysqld --lower_case_table_names=1 --skip-ssl

```
其中创建了一个mysql容器，并且规定了其端口以及其他属性，并且创建了一个名为stc的database。需要重点注意的是volumes一行指定将该数据库的内容挂载在本机的～/mnt/mysql/里，所以本机会自动创建该目录并存储mysql相关信息，这样做的好处是重启docker时保证mysql的内容不会丢失，同时大家注意不要手动去删除该目录。

### 注意事项

1. 如碰到spring-boot:run编译时间过长的问题，卡在随机数产生，可通过以下步骤解决：
```
vim $JAVA_home/jre/lib/security/java.security
```
找到`securerandom.source = file:/dev/random`这一行，修改为:
`securerandom.source = file:/dev/urandom`

2. Java 请务必使用1.8，否则可能导致编译失败。

2. 未完待续...大家在部署过程中有什么遇到的问题以及解决办法都可以分享出来，供所有同学参考。



## 代码整合
代码结构如下：
```aidl
├── java
│   └── com
│       └── sinosteel
│           ├── FrameworkApplication.java
│           ├── domain                     --实体对象
│           ├── framework                  
│           │   ├── config                 --配置文件
│           │   │   ├── database           --数据库配置
│           │   │   ├── druid              --数据库连接池
│           │   │   ├── http               --处理跨域访问
│           │   │   ├── listener           --ApplicationListener
│           │   │   ├── system             --系统环境配置
│           │   │   └── web                --web配置
│           │   ├── core
│           │   │   ├── listener           --定义ApplicationListener
│           │   │   └── web                --定义Request和Response类
│           │   ├── helpers
│           │   │   ├── hierarchy          --特殊的有层次结构的类
│           │   │   │   ├── domain
│           │   │   │   └── helper         --提供对Hierarchy类的基本操作
│           │   │   └── pagination         --分页
│           │   ├── mybatis                --查询数据库
│           │   └── utils                  --工具类
│           │       ├── date               --日期工具
│           │       ├── encryption         --加密工具
│           │       ├── json               --json工具
│           │       ├── list               --list工具
│           │       ├── map                --map工具
│           │       └── string             --字符串工具
│           ├── repository                 --仓库
│           ├── service                    --service
│           └── web                        --web
└── resources                              
    ├── application.properties
    ├── banner.txt
    ├── config
    │   ├── datasource.properties          --数据库配置
    │   └── system.properties              --系统配置
    └── structure.json                     --整个框架的结构
```

> 特别感谢李青坪师兄帮助我们整理框架
