### AirLastHoursChange  过去24小时变化

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/air/airLastHoursChange'" style="border:none;width:280px;height:100%"></iframe>
</div>


```html
<!--  airLastHoursChange -->
<template>
	<view>
		<!-- 过去24小时变化  src/components/business/air/pm-air-last-hours-change/pm-air-last-hours-change.vue -->
		<p-mui-wrapper :title="'过去24小时变化'">
            <pm-air-last-hours-change
                @pollutantChange="pollutantChange"
                :data="data"
            ></pm-air-last-hours-change>
        </p-mui-wrapper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data:{
				pollutantData: [] //24小时污染物浓度数据
			}
		};
	},
	mounted() {
	},
	methods: {
        // 污染物选中变化
		pollutantChange(val) {
			// 获取不同污染物的24小时污染浓度
			this.pollutantData = [];
			// Math.floor(Math.random() * (max - min)) + min

				let j=0
			for (let i = 0; i < 24; i++) {
				let mData='2020-12-22 '
				
				this.pollutantData.push({
					aqiLevelMark: '',//AQI等级标识
					pm10Iaqi: '', //pm10aqi
					color: '', //颜色
					o3: Math.floor(Math.random() * (100 - 0)),//o3浓度
					level: '', //监管级别
					latitude: '', //纬度
					longitude: '',//经度
					pm10: Math.floor(Math.random() * (200 - 0)),//pm10浓度
					co: Math.floor(Math.random() * (100 - 0)),//co浓度
					o3Iaqi: '', //o3aqi
					no2: Math.floor(Math.random() * (200 - 0)),//no2浓度
					coIaqi: '', //coAQI
					areaCode: '330600',//行政区代码
					areaName: '绍兴市',//行政区名称
					pm25: Math.floor(Math.random() * (300 - 0)),//pm25浓度
					aqiLevel: '',//AQI等级
					monitorDate: mData+(String(++j).padStart(2, '0')),//监测时间
					so2: Math.floor(Math.random() * (200 - 0)), //so2浓度
					aqi: Math.floor(Math.random() * (300 - 0)),//aiq
					pm25Iaqi: '',//pm25aqi
					no2Iaqi: '',//no2aqi
					maxItem: '',//首要污染物
					so2Iaqi: '' //so2aqi
				});
			}
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

| 参数名        | 简介             | 类型  | 备注           |
| ------------- | ---------------- | ----- | -------------- |
| pollutantData | 各污染物浓度指数 | Array | 必传，默认为空 |

#### config

| 参数名      | 简介          | 类型   | 备注                                    |
| ----------- | ------------- | ------ | --------------------------------------- |
| showEcharts | echarts图展示 | String | 默认为false ，false 柱状图，true 折线图 |
