### AirCurrentQuality 实时空气质量

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/air/airCurrentQuality'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html
<template>
	<scroll-view scroll-y style="height: 100%;" class="air-current-quality">
		<!-- 实时空气质量  src/components/business/air/pm-air-current-quality/pm-air-current-quality.vue -->
		<p-mui-wrapper :title="'实时空气质量'">
            <pm-air-current-quality :data="data">
                <view slot="title">
                    <view class="p1">实时空气质量</view>
                </view>
            </pm-air-current-quality>
        </p-mui-wrapper>

	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			data: {
				pollutantData: [] //污染物指数
			}
		};
	},
	mounted() {
		// 获取aqi数据
		this.getAQIData();
	},
	methods: {
		// 获取aqi数据
		getAQIData() {
			let datas = [
				{
					no2: '22',  //NO₂浓度
					areaCode: '340600',//行政区代码
					pm25: '15', //PM₂.₅浓度
					o3: '39',//O₃浓度
					areaName: '郑州市', //行政区名称
					monitorDate: '2020-07-31 09',
					so2: '3',//SO₂浓度
					pm10: '23',//PM₁₀浓度
					aqi: '23',//AQI
					rank: 1, //排名
					co: '0.5',//CO浓度
					maxItem: '—' //首要污染物
				}
			];
			
			this.data.pollutantData = datas
		}	
	}
};
</script>

<style></style>
```
### props 参数
| 参数名 | 简介   | 类型   |
| ------ | ------ | ------ |
| data   | 数据   | Object |
| config | 配置项 | Object |


#### data 

| 参数名        | 简介       | 类型   | 备注                                                  |
| ------------- | ---------- | ------ | ----------------------------------------------------- |
| pollutantData | 污染物指数 | Array  | 默认为空                                              |
| tips          | 提示       | String | 默认为 "健康提示：极少数异常敏感人群应减少户外活动。" |

#### config

| 参数名   | 简介           | 类型    | 备注                                                         |
| -------- | -------------- | ------- | ------------------------------------------------------------ |
| showFlag | 污染物展示方法 | Boolean | 默认为false, true是每个都带单位，false 是 单位统一写一个地方 |
