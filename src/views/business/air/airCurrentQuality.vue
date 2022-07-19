<!-- @format -->

<template>
    <scroll-view scroll-y style="height: 100%" class="air-current-quality">
        <!-- 实时空气质量 src/components/business/air/pm-air-current-quality/pm-air-current-quality.vue -->
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
                // dataAQI: '', //aqi指数
                // pollutantFirst: '', //首要污染物
                // time: '', //更新时间
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
            // this.data.dataAQI = 80;
            // this.data.pollutantFirst = 'PM2.5';
            // this.data.time = '2019-05-06 08';

            // // 污染物指数
            // this.data.pollutantData = [
            // 	{ name: 'PM25', value: 50 },
            // 	{ name: 'PM10', value: 21 },
            // 	{ name: 'O3', value: 67 },
            // 	{ name: 'NO2', value: 60 },
            // 	{ name: 'SO2', value: 87 },
            // 	{ name: 'CO', value: 134 }
            // ];

            let datas = [
                {
                    no2: '22', //NO₂浓度
                    areaCode: '340600', //行政区代码
                    pm25: '15', //PM₂.₅浓度
                    o3: '39', //O₃浓度
                    areaName: '郑州市', //行政区名称
                    monitorDate: '2020-07-31 09',
                    so2: '3', //SO₂浓度
                    pm10: '23', //PM₁₀浓度
                    aqi: '23', //AQI
                    rank: 1, //排名
                    co: '0.5', //CO浓度
                    maxItem: '—' //首要污染物
                }
            ];

            this.data.pollutantData = datas;
        }
    }
};
</script>

<style></style>
