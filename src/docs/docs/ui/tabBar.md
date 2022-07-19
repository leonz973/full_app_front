### tabBar（底部导航栏）

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/tabBar'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码
```html
<template>
   <view>
	    <u-tabbar v-model="current" :list="list"></u-tabbar>
    </view>
</template>


<script>
    export default {
		data() {
			return {
					list: [{
							iconPath: "home",//非选中按钮的图标
							selectedIconPath: "home-fill",//选中按钮的图标
							text: '首页' //显示的提示文字
						},
						{
							iconPath: "photo",
							selectedIconPath: "photo-fill",
							text: '表格',
							pagePath: '/views/demo/table' //点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
						},
						{
							iconPath: menuIcon3,
							selectedIconPath: menuIcon3s,
							text: '水环境'
						},
						{
							iconPath: "account",
							selectedIconPath: "account-fill",
							text: '我的',
							count: 23 //红色角标显示的数字，如果需要移除角标，配置此参数为0即可
						},
						{
							iconPath: "account",
							selectedIconPath: "account-fill",
							text: '我的',
							isDot: true // 如果配置此值为true，那么角标将会以红点的形式显示
						},
					], //各项的配置参数
					current: 0 //激活项的索引值
			}
		},
        methods: {

        }
    }    
</script>

```


[uview官网文档传送门-tabBar](https://www.uviewui.com/components/tabbar.html)

