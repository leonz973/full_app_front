<!-- @format -->

<!--  airLastHoursChange -->
<template>
    <view>
        <!-- 过去24小时变化 src/components/business/air/pm-air-last-hours-change/pm-air-last-hours-change.vue -->
        <p-mui-wrapper :title="'过去24小时变化'">
            <pm-air-last-hours-change
                @pollutantChange="pollutantChange"
                :data="data"
                :config="{ showEcharts: true }"
            ></pm-air-last-hours-change>
        </p-mui-wrapper>
    </view>
</template>

<script>
export default {
    data() {
        return {
            data: {
                pollutantData: [] //24小时污染物浓度数据
            }
        };
    },
    mounted() {},
    methods: {
        // 污染物选中变化
        pollutantChange(val) {
            // 获取不同污染物的24小时污染浓度
            this.data.pollutantData = [];
            // Math.floor(Math.random() * (max - min)) + min

            let j = 0;
            for (let i = 0; i < 24; i++) {
                let mData = '2020-12-22 ';

                this.data.pollutantData.push({
                    areaCode: '330600', //行政区代码
                    areaName: '绍兴市', //行政区名称
                    latitude: '', //纬度
                    longitude: '', //经度
                    maxItem: '', //首要污染物
                    color: '', //颜色
                    monitorDate: mData + String(++j).padStart(2, '0'), //监测时间
                    level: '', //监管级别
                    aqiLevelMark: '', //AQI等级标识
                    aqiLevel: '', //AQI等级
                    aqi: Math.floor(Math.random() * (300 - 0)), //aiq
                    pm10Iaqi: '', //pm10aqi
                    pm10: Math.floor(Math.random() * (200 - 0)), //pm10浓度
                    o3: Math.floor(Math.random() * (100 - 0)), //o3浓度
                    o3Iaqi: '', //o3aqi
                    co: Math.floor(Math.random() * (100 - 0)), //co浓度
                    coIaqi: '', //coAQI
                    no2: Math.floor(Math.random() * (200 - 0)), //no2浓度
                    no2Iaqi: '', //no2aqi
                    pm25: Math.floor(Math.random() * (300 - 0)), //pm25浓度
                    pm25Iaqi: '', //pm25aqi
                    so2: Math.floor(Math.random() * (200 - 0)), //so2浓度
                    so2Iaqi: '' //so2aqi
                });
            }
        }
    }
};
</script>

<style></style>
