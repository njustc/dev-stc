# Ruby On Rails数据迁移

## 1.配置环境
1.安装Ruby
2.安装Rail

自行去查安装方式。

## 2.构建

进入 dbmigration目录。

执行
	
	bundle install
	
命令

注：这里即使你在docker里有mysql，它仍需要你在本机下载mysql，我找不到解决方案。config/database.yml里的Adapter为mysql2，需要gem获取包，而gem需要本机的mysql。

不过安装好后其连接的是docker里的mysql container，所以能使用。若为windows系统使用docker toolbox的记得改config/database.yml里的host。

成功之后可以使用命令
	
	rails server
	
浏览器访问 localhost:3000会出现一个Rails的界面。

这个server没用。只是检查是否能用，可以关掉。

## 3.更新数据库

### 1.删除原数据库

将原mysql里的数据库整个删除。

不需要创建新的，直接退出。

### 2.创建数据库

在该目录下使用如下命令：

	rake db:create
	
会在mysql中创建stc 数据库（stc名字可以改，不过要跟pring-boot的配置文件一致），数据库中默认会有两张表。

### 3.“南大测试”数据库初始化
我已经写好初始化的ruby脚本。

这里直接在该目录下使用如下命令：
	
	rake db:migrate

会构建出项目所需的所有表项。以及建立所有的外键。
每一个表项就是一条migration记录

使用如下命令：

	rake db:seed
	
会往数据库中写入初始的数据。注：写入数据不是migration记录。

目前有function（consign，contract），User（admin，marketing，customer1，customer2），Role（超级管理员，市场部工作人员，客户）以及两个连接表（Role-User，Role-function）。

## 4.命令使用

	rake db:rollback STEP=n
	# 回滚n条 migration记录。
	
	rake db:migrate
	# 将在db/migration目录下的所有migration记录按照顺序写入数据库。
	
	rake db:create
	# 创建数据库，配置文件见config/database.yml
	
	rake db:seed
	# 将db/seeds.rb里记录的数据写入数据库，写入数据不算入migration记录。
	
> 使用Ruby On Rails 的Migrations可以方便的修改表的结构。数据量大时表现目前不知道。
