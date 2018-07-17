# Android client 模块

## Android端jsdoc生成步骤

### 准备工作
- `npm install -g jsdoc` (一次就好)

### 操作
- `cd dev-stc`(进入dev-stc目录)
- `jsdoc -c android-jsdoc.json`(依据`android-jsdoc.json`配置文件来生成文件)

### 生成
- 默认生成目录为`dev-stc/android-out/`
- `android-out/index.html`即为生成文档

# NativeBase KitchenSink v2.5.0
An example app with all the UI components of NativeBase

> **NativeBase-KitchenSink** comes in four forms of app for you!
>1. Pure React Native App with `react-navigation` on branch **[master](https://github.com/GeekyAnts/NativeBase-KitchenSink)**
>2. Pure React Native App with `RNRF` on branch **[RNRF](https://github.com/GeekyAnts/NativeBase-KitchenSink/tree/RNRF)**
>3. An Expo app with `CRNA` and `react-navigation` on branch **[CRNA](https://github.com/GeekyAnts/NativeBase-KitchenSink/tree/CRNA)**
>4. A React App with `NativeBase for web` on branch **[web-support](https://github.com/GeekyAnts/NativeBase-KitchenSink/tree/web-support)**

>Find the installation guide in `ReadMe` of appropriate branches

## Demo

iOS | Android
 :--:| :-----:
 ![ios-demo](https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/master/screenshots/iOS.gif) | ![android-demo](https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/master/screenshots/Android.gif)

## Installation

*	**Clone and install packages**
```
git clone git@github.com:GeekyAnts/NativeBase-KitchenSink.git
cd NativeBase-KitchenSink
yarn
react-native link react-native-vector-icons
```

*	**Run on iOS**
	*	Opt #1:
		*	Open the project in Xcode from `ios/NativeBase-KitchenSink.xcodeproj`
		*	Click `run` button to simulate
	*	Opt #2:
		*	Run `react-native run-ios` in your terminal


*	**Run on Android**
	*	Make sure you have an `Android emulator` installed and running
	*	Run `react-native run-android` in your terminal



## BuilderX

Another major project by us is [BuilderX](https://builderx.io/?utm_source=github&utm_medium=kitchensink&utm_campaign=kitchensink), a screen design tool which codes React Native for you.
