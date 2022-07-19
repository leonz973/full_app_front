- [1. uni-app介绍](#1-uni-app介绍)
  - [1.1. 首先要安装hbuilderX](#11-首先要安装hbuilderx)
  - [1.2](#12)
- [2. 开发模板目录结构](#2-开发模板目录结构)
- [3. 用法介绍](#3-用法介绍)
  - [3.1. pages.json 介绍  (这里类型vue的路由)](#31-pagesjson-介绍--这里类型vue的路由)
  - [3.2. 组件介绍](#32-组件介绍)
  - [3.3. 样式介绍](#33-样式介绍)
  - [3.4. 常用api介绍](#34-常用api介绍)
- [4. 开发阶段](#4-开发阶段)
  - [4.1. 切图样式替换成rpx](#41-切图样式替换成rpx)
    - [4.1.1. 样式放系统中](#411-样式放系统中)
  - [4.2. 编写页面](#42-编写页面)
- [5. 运行与打包](#5-运行与打包)
  - [5.1. webapp 运行](#51-webapp-运行)
  - [5.2. 打包](#52-打包)
  - [5.3. 小程序运行](#53-小程序运行)
  - [5.4. 小程序上传](#54-小程序上传)
- [6. 小程序开发注意事项](#6-小程序开发注意事项)

<!-- /TOC -->
# 1. uni-app介绍 
[官方传送门](https://uniapp.dcloud.io/)
> uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

## 1.1. 首先要安装hbuilderX
[传送门](https://www.dcloud.io/hbuilderx.html/)

## 1.2
> 本项目是用vue-cli uniapp分支创建而成。

> 由[vue3](https://v3.cn.vuejs.org/)（框架）+ [vuex](https://next.vuex.vuejs.org/)（状态管理工具）+ [axios](https://www.npmjs.com/package/axios)（异步请求数据）+ [p-mui](http://202.104.140.36:3000/docs/)（ui框架，基于uview）+ [echarts](https://echarts.apache.org/zh/index.html)(图表工具) + [p-charts](http://www.bovosz.com/uidemo/index.html#/intro)（vue封装的一些常用图表组件）组成

# 2. 开发模板目录结构

```
public
	└ index.html        // 入口html
src      
	└ api               //api接口统一管理 
		[page name].js  //命名要和模块一致
	└ common            //css，images存放
		└ powerapp
			└ css
			└ js
	└ conponents       //公用vue组件
	└ hybird           //hybird 页面
	└ jssdk            //uni-app 常用的组件
	└ static           //一些图片放在这里
	└ store             //vuex状态管理，全局状态管理放到index.js里面
		└ index.js
	└ utils             //自己写的工具方法
	└ views
		└ [page name]   //功能模块名字
			└ [page name].store.js
	└ App.vue           //vue入口模板
	└ remToRpx.html        // rem转rpx 
	
	└ main.js           //加载vue，router，第三方插件入口
	└ pages.json        //页面跳转设置
	└ manifest.json     //文件是应用的配置文件，用于指定应用的名称、图标、权限等
└ package.json          // 包管理工具
└ .eslintrc.js          // eslint 工具
└ .npmrc                // 私服
```

# 3. 用法介绍

## 3.1. pages.json 介绍  (这里类型vue的路由)

[传送门](https://uniapp.dcloud.io/collocation/pages)

```
{
	"pages": [{
			"path": "views/control/Index",
			"style": {
				"navigationBarTitleText": "执法信息",
				"app-plus": {
					"titleNView": false,
					"bounce": "none"
				}
			}
		}
    ],
	"globalStyle": {
		"navigationBarTextStyle": "white",
		"navigationBarTitleText": "Hello uniapp",
		"navigationBarBackgroundColor": "#139A77",
		"backgroundColor": "#139A77",
		"mp-alipay": {
			"titleBarColor": "#FFFFFF"
		}
	},
	"condition": { //模式配置，仅开发期间生效
		"current": 0, //当前激活的模式(list 的索引项)
		"list": [{
			"name": "", //模式名称
			"path": "", //启动页面，必选
			"query": "" //启动参数，在页面的onLoad函数里面得到
		}]
	}
}
```
## 3.2. 组件介绍

[组件传送门](https://uniapp.dcloud.io/component/README)

1. view 相当于 div
2. text 相当于 span
3. image 相当于 img

- 这里可以直接使用html编写，他会自动转换成uni-app对应的组件

## 3.3. 样式介绍

[rpx介绍传送门](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

- uni-app 使用的是rpx为单位（和小程序保持一致），默认一个屏幕为750rpx


## 3.4. 常用api介绍

[api传送门](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

> 这里的api是指 标准ECMAScript的js API 和 uni 扩展 API 这两部分组成，可以调用一些打开新页面，跳转新页面，调用小程序内核功能的一些api。


# 4. 开发阶段

## 4.1. 切图样式替换成rpx

- 利用目录中 remToRpx.html 转换

### 4.1.1. 样式放系统中

css 放在
```
└ common            //css，images存放
    └ powerapp
         └ css
```
图片放在
```
└ static  
```

然后把样式里面../images 替换成~@/static/images 中

## 4.2. 编写页面

- views 下面编写vue页面，和正常写vue项目一样
- pages.json里面新加一个入口



# 5. 运行与打包
> 下载依赖
> 
npm run fastInstall  || yarn fastInstall


## 5.1. webapp 运行

![image](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/run-chrome.png)
[传送门](https://uniapp.dcloud.io/quickstart)

命令行运行
```
npm run dev:h5 || yarn dev:h5
```

## 5.2. 打包

![image](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-10.png)

## 5.3. 小程序运行

- 首先安装微信开发者工具 [下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html/)
- 在微信开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app
![image](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-1.png)
- 这里有可能不成功，要开启服务端口
![image](https://img-blog.csdnimg.cn/20190119134346432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3h1ZWxhbmc1MzI3NzcwMzI=,size_16,color_FFFFFF,t_70)


## 5.4. 小程序上传

- 申请微信小程序AppID
- 设置appid
![image](http://confluence.szboanda.com:31368/download/attachments/39780569/image2021-1-15_8-40-1.png?version=1&modificationDate=1610671205000&api=v2)
- 发布小程序

> 在微信小程序开发者工具中，导入生成的微信小程序项目，测试项目代码运行正常后，点击“上传”按钮，之后按照 “提交审核” => “发布” 小程序标准流程，逐步操作即可
![image](https://exp-picture.cdn.bcebos.com/f367139a310e1799f4986c0cc9406afec214a30a.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_500%2Climit_1)

# 6. 小程序开发注意事项
- 小程序代码不超过2M
- 图片尽量存在服务器中，一些小的ico可以存在小程序中，其他超过20k以上的图片尽量存在服务器。
