### AirQualityForecast 空气质量预报 

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/air/airQualityForecast'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html
<template>
	<view>
		<!-- 空气质量预报  src/components/business/air/pm-air-quality-forecast/pm-air-quality-forecast.vue -->
		<p-mui-wrapper :title="'空气质量预报'">
            <pm-air-quality-forecast
                :data="data"
                :config="config"
            ></pm-air-quality-forecast>
        </p-mui-wrapper>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			data:{
				qualityData:[], //空气质量预报
			},
			config:{
				airArrange:false //空气质量预报展示方式
			}
		};
	},
	mounted() {
		// 获取空气质量预报
		this.getAirQuality()
	},
	methods: {
		
		// 获取空气质量预报
		getAirQuality(){
			// 污染物PM25、PM₂.₅格式都可以 组件显示时会转换下标
			if(!this.airArrange) {
				
				// calcMonitorDate:预报时间
                // maxItem:首要污染物
                // aqiMin:AQI最小值
                // aqiMax:AQI最大值
				this.data.qualityData=[
					{calcMonitorDate:'5/01',maxItem:'--',aqiMin:25,aqiMax:50},
					{calcMonitorDate:'5/02',maxItem:'PM25',aqiMin:30,aqiMax:75},
					{calcMonitorDate:'5/03',maxItem:'O₃',aqiMin:34,aqiMax:110},
					{calcMonitorDate:'5/04',maxItem:'PM₁₀',aqiMin:40,aqiMax:130},
					{calcMonitorDate:'5/05',maxItem:'PM₂.₅',aqiMin:46,aqiMax:75},
					{calcMonitorDate:'5/06',maxItem:'PM₂.₅',aqiMin:50,aqiMax:110},
					{calcMonitorDate:'5/07',maxItem:'PM10',aqiMin:55,aqiMax:130},
				]
			}else {
				this.data.qualityData=[
					{calcMonitorDate:'5/15',maxItem:'--',aqiMin:25,aqiMax:50},
					{calcMonitorDate:'5/16',maxItem:'PM25',aqiMin:170,aqiMax:190},
					{calcMonitorDate:'5/17',maxItem:'O₃',aqiMin:34,aqiMax:110},
				]
			}
		}
	}
};
</script>

<style>
</style>

```

### props 参数

| 参数名 | 简介   | 类型   |
| ------ | ------ | ------ |
| data   | 数据   | Object |
| config | 配置项 | Object |

#### data

| 参数名      | 简介         | 类型  | 备注           |
| ----------- | ------------ | ----- | -------------- |
| qualityData | 空气质量数据 | Array | 必传，默认为空 |

#### config

| 参数名     | 简介             | 类型    | 备注                                                   |
| ---------- | ---------------- | ------- | ------------------------------------------------------ |
| airArrange | 空气质量展示方法 | Boolean | 默认为false，false 表格排列样式 , true 展示3天的优良率 |
