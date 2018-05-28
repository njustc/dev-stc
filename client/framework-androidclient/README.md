## 移动端代码说明
### 代码位置
移动端代码在`dev-stc/client/framework-androidclient/`

### 运行前说明
将代码clone到本地后，需先查看`dev-stc/client/framework-androidclient/android/gradle/wrapper/
`下`gradle-wrapper.jar`文件是否存在

由于`.gitignore`将`.jar`文件忽略，尝试过不忽略`gradle-wrapper.jar`文件但是失败了，现在只能用`git add -f`命令强制上传此文件

若没有此文件，请找`wyy`获得该文件

### 运行
首先配置`react native`运行环境（注意开发平台和目标平台）： https://reactnative.cn/docs/0.51/getting-started.html

- macOS端：
1. 确保开启Android虚拟机或连接Android真机并设置为开发者模式允许USB调试
2. 在`dev-stc/client/framework-androidclient/`目录下
    1. 执行`npm install`
    2. 执行`react-native run-android`

- Windows端

请根据 https://reactnative.cn/docs/0.51/getting-started.html 自行配置