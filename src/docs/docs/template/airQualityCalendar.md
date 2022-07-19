### AirQualityCalendar  空气质量日历

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/air/airQualityCalendar'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html

<template>
    <view>
        <!-- 空气质量日历  src/components/business/air/pm-air-quality-calendar/pm-air-quality-calendar.vue -->
        <pm-air-quality-calendar
        :data="data"
        @pollutantChange="pollutantChange"
        @dateChange="dateChange"
        ></pm-air-quality-calendar>
    </view>
</template>

<script>
export default {
    name: 'airQualityCalendar',
    data() {
        return {
            data: {
                city: '江阴市', //城市名
                aqiDate: [],
            },
            pollutantData: {}, //污染物
            date: '', //日期
        }
    },
    created() {
        // this.getData()
    },
    watch: {
        date: 'getData',
        pollutantData: 'getData',
    },
    methods: {
        getData() {
            this.data.aqiDate = [
                {
                    aqi: '73', //aqi
                    aqiLevel: '良', //AQI等级
                    aqiLevelMark: '二级', //AQI等级标识
                    areaCode: '320281', //行政区代码
                    areaName: '江阴市', //行政区名称
                    co: '0.8', //co浓度
                    coIaqi: '20', //coAQI
                    color: '黄色  ', //颜色
                    latitude: '31.916334', //纬度
                    longitude: '120.269', //经度
                    maxItem: 'PM2.5', //首要污染物
                    monitorDate: '2021-07-06', //监测时间
                    no2: '34', //no2浓度
                    no2Iaqi: '43', //no2aqi
                    o3: '54', //o3浓度
                    o3Iaqi: '27', //o3aqi
                    pm10: '82', //pm10浓度
                    pm10Iaqi: '66', //pm10aqi
                    pm25: '53', //pm25浓度
                    pm25Iaqi: '73', //pm25aqi
                    so2: '11', //so2浓度
                    so2Iaqi: '11', //so2aqi
                    当期: '当期dataRange',
                },
                {
                    aqi: '89',
                    aqiLevel: '良',
                    aqiLevelMark: '二级',
                    areaCode: '320281',
                    areaName: '江阴市',
                    co: '0.8',
                    coIaqi: '20',
                    color: '黄色  ',
                    latitude: '31.916334',
                    longitude: '120.269',
                    maxItem: 'O3',
                    monitorDate: '2021-07-03',
                    no2: '34',
                    no2Iaqi: '43',
                    o3: '54',
                    o3Iaqi: '27',
                    pm10: '85',
                    pm10Iaqi: '66',
                    pm25: '53',
                    pm25Iaqi: '73',
                    so2: '11',
                    so2Iaqi: '11',
                    当期: '当期dataRange',
                },
                {
                    aqi: '40',
                    aqiLevel: '优',
                    aqiLevelMark: '一级',
                    areaCode: '320281',
                    areaName: '江阴市',
                    co: '0.7',
                    coIaqi: '19',
                    color: '绿色  ',
                    latitude: '31.916334',
                    level: '优',
                    longitude: '120.269',
                    maxItem: '',
                    monitorDate: '2021-07-02',
                    no2: '32',
                    no2Iaqi: '40',
                    nowVal: '40',
                    o3: '64',
                    o3Iaqi: '32',
                    pm10: '26',
                    pm10Iaqi: '26',
                    pm25: '16',
                    pm25Iaqi: '23',
                    so2: '6',
                    so2Iaqi: '6',
                    当期: '当期dataRange',
                },
            ]
        },

        // 污染物切换
        pollutantChange(val) {
            this.pollutantData = val
        },

        // 日期切换
        dateChange(val) {
            this.date = val
        },
    },
}
</script>

<style lang="less" scoped></style>

```

### props 参数
| 参数名 | 简介 | 类型   |
| ------ | ---- | ------ |
| data   | 数据 | Object |

#### data

| 参数名  | 简介     | 类型   | 备注           |
| ------- | -------- | ------ | -------------- |
| aqiDate | 日历数据 | Array  | 必传，默认为空 |
| city    | 城市名   | String | 必传，默认为空 |