# 持续集成，持续部署

## 文件说明

### deploy.js
一个小型web程序，采用node编写。

在本机的7777端口上进行监听，对github的webhook事件作出相应反应

首次使用需要安装模块

```
npm install github-webhook-handler
```

启动命令

```
node deploy.js
```

## deploy.sh
一个自动化部署的bash脚本。其运行效果可概括为

```
git pull拉取更新 -> 编译后台并运行 -> 将前端中dist文件更新至nginx服务器中
```

启动命令

```
./deploy.sh
```
