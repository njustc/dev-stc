# Client模块

## 前端jsdoc生成步骤
 - cd dev-stc  (进入dev-stc目录)
 - jsdoc -c web-jsdoc.json -r

## 前端部署步骤
### 准备工作
首先确保以下已经安装

* node.js （目前node版本 **8.11.1, 9.0.0, 9.4.0** 亲测可用，npm版本 **5.6.0**亲测可用。node 10.0.0 **不建议使用** ）
> npm源最好采用官方源

* gcc编译器 （npm install过程中会自动安装gyp，node sass等，这些安装需要C++编译）。

* python2 (一般的Unix系列操作系统均预装了python2)

### 部署工作
运行以下命令

```
cd client/framework-webclient
npm install
npm run dev
```

运行成功后可浏览器登录 localhost:3000 查看界面。

### dist部署
为了使前端在云服务器上及时更新，需要在本地更新仓库中的`client/framework-webclient/dist`内文件并上传至仓库（云服务器环境无法编译）。

为了方便dist文件的编译生成（修改host -> 生成dist -> 还原host），我在本目录下（`client/framework-webclient/`)放置了脚本`auto-build-dist.sh`。

执行`./auto-build-dist.sh`即可自动执行以上步骤生成dist文件,无需手动修改host.

> 注意：由于GNU与BSD的sed命令有所不同，对于Mac用户，需要执行以下命令将sed命令替换为GNU下的形式方可成功运行。具体步骤如下：

> ```
> brew install gnu-sed --with-default-names
> ```
> (以上命令需要Homebrew支持。未安装Homebrew的Mac用户可以自行Google解决）

### 注意事项

1. 如果发现node版本不支持，需要换版本时，换版本后要**手动清除已安装的gyp包**。（该包位于`~/.node-gyp/`目录下）。

2. 运行时请关闭fq软件或者取消全局代理模式。

2. 未完待续...大家在部署过程中有什么遇到的问题以及解决办法都可以分享出来，供所有同学参考。
