# API 接口文档使用说明
接口文档采用Swagger编写，有如下特点

* 界面优美，清晰明了
* 能够直接进行测试

需要使用Swagger-UI进行部署之后才能完整的使用本文档。

## 部署说明
首先需要安装 http-server

```
npm install -g http-server
```
然后进入项目下的api目录，运行http-server

```
cd api
http-server --cors
```
运行成功后，进入`swagger-ui-dist`目录下用浏览器打开`index.html`即可

# Postman Collection使用说明
如果使用postman，可以将文件`dev-stc.postman_collection.json`导入postman中，便可得到所有的请求及实例