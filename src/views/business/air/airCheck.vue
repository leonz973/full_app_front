<!-- @format -->

<template>
    <view>
        <!-- 考核  src/components/business/air/pm-air-check/pm-air-check.vue-->
        <p-mui-wrapper :title="'考核 '">
            <pm-air-check :data="data"></pm-air-check>
        </p-mui-wrapper>
    </view>
</template>

<script>
export default {
    data() {
        return {
            data: {
                checkData: {} //考核数据
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        // 获取考核数据
        init() {
            let goodData =
                // 优良天数
                [
                    {
                        areaCode: '', //行政区代码
                        areaName: '', //行政区名称
                        longitude: '', //经度
                        latitude: '', //纬度
                        startDate: '', //开始时间
                        endDate: '2020-10-02 05', //结束时间
                        goodRate: '25', //浓度
                        goodRateTB: '23', //浓度同比
                        goodRateMBZ: '14', //浓度目标值
                        goodRateJLZ: '', //浓度激励值
                        goodRateKZZ: '', //浓度控制值
                        goodRateJLKZZ: '', //浓度激励值的控制值
                        goodRateUpStandard: '未达标', //是否达标,
                        exceedDays: '', //超标天数
                        overDays: '13' //剩余超标天数
                    }
                ];
            let pm25Data = [
                {
                    areaCode: '', //行政区代码
                    areaName: '', //行政区名称
                    longitude: '', //经度
                    latitude: '', //纬度
                    startDate: '', //开始时间
                    endDate: '2020-10-02 08', //结束时间
                    pm25: '25', //PM₂.₅浓度
                    pm25TB: '15', //PM₂.₅浓度同比
                    pm25MBZ: '22', //PM₂.₅浓度目标值
                    pm25JLZ: '', //PM₂.₅浓度激励值
                    pm25KZZ: '', //PM₂.₅浓度控制值
                    pm25JLKZZ: '', //PM₂.₅浓度激励值的控制值
                    pm25UpStandard: '未达标', //pm25是否达标,
                    exceedDays: '', //超标天数
                    overDays: '8' //剩余超标天数
                }
            ];

            this.data.checkData = { goodData, pm25Data };
        }
    }
};
</script>

<style></style>
