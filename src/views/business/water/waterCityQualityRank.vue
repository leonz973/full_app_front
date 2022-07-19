<!-- @format -->

<template>
    <div class="waterCityQualityRank">
        <!-- 城市水质排名  src/components/business/water/pm-water-city-quality-rank/pm-water-city-quality-rank.vue -->

        <p-mui-wrapper :title="'城市水质排名'">
            <pm-water-city-quality-rank :data="data" :config="config">
                <!--  #ifndef  MP-WEIXIN -->
                <!-- 除了小程序都显示 -->
                <template v-slot:pm25="{ data }">
                    <div
                        class="slot-div"
                        :style="{ width: data.td.width + 'rpx' }"
                    >
                        <div>{{ data.key }}</div>
                    </div>
                </template>
                <!-- <template v-slot:pm10="{ data }">
                <div
                    class="slot-div divs"
                    :style="{ width: data.td.width + 'rpx' }"
                >
                    <div>{{ data.key }}%</div>
                </div>
            </template> -->
                <!--  #endif -->

                <!--  #ifndef APP-PLUS || H5 -->
                <!-- 只有小程序都显示 -->
                <template v-slot:slot="{ data }">
                    <div
                        class="slot-div"
                        :style="{ width: data.td.width + 'rpx' }"
                    >
                        <div>{{ data.key }}</div>
                    </div>
                </template>
                <!--  #endif -->
            </pm-water-city-quality-rank>
        </p-mui-wrapper>
    </div>
</template>

<script>
export default {
    name: 'waterCityQualityRank',
    data() {
        return {
            data: {
                tableData: [],
                columns: []
            },
            config: {
                isBlue: false
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.data.tableData = [
                {
                    areaCode: '', //行政区代码
                    areaName: '汕头', //所属行政区
                    longitude: '', //经度
                    latitude: '', //纬度
                    rank: '1', //排名
                    waterIndex: '2.23', //水质指数
                    waterTB: '-10.1', //同比变化率
                    pm25: '40'
                },
                {
                    areaCode: '', //行政区代码
                    areaName: '汕尾', //所属行政区
                    longitude: '', //经度
                    latitude: '', //纬度
                    rank: '2', //排名
                    waterIndex: '1.23', //水质指数
                    waterTB: '+9.4', //同比变化率
                    pm25: '80'
                },
                {
                    areaCode: '', //行政区代码
                    areaName: '梅州', //所属行政区
                    longitude: '', //经度
                    latitude: '', //纬度
                    rank: '3', //排名
                    waterIndex: '3.2', //水质指数
                    waterTB: '-10.1', //同比变化率
                    pm25: '110'
                },
                {
                    areaCode: '', //行政区代码
                    areaName: '韶关', //所属行政区
                    longitude: '', //经度
                    latitude: '', //纬度
                    rank: '4', //排名
                    waterIndex: '2.23', //水质指数
                    waterTB: '+3.4', //同比变化率
                    pm25: '140'
                }
            ];

            // 注：
            // 在小程序中只能定义一个具名插槽，且名字默认为：slot，不可修改，传入的名字是没有用的。
            // 在h5或者app中可以随意定义具名插槽 （可定义多个）。
            this.data.columns = [
                {
                    title: '排名',
                    key: 'rank'
                },
                {
                    title: '城市',
                    key: 'areaName'
                },
                {
                    title: '水质指数',
                    key: 'waterIndex',
                    isRank: true,
                    width: '155'
                },
                {
                    title: '同比变化率', //标题名
                    key: 'waterTB', //属性名
                    isRank: true, //是否排序
                    unit: '%', //单位
                    width: '185', //单元格宽
                    isColor: true //文字是否有颜色
                },
                {
                    title: 'pm2.5浓度', //标题名
                    key: 'pm25', //属性名
                    width: '170', //单元格宽
                    isSlot: true, // 是否插槽
                    slotName: 'pm25' //插槽名
                }
            ];

            // #ifndef MP-WEIXIN
            // 在app或h5端再追加一个插槽
            // this.data.columns.push({
            //     title: 'pm10浓度', //标题名
            //     key: 'pm25', //属性名
            //     width: '180', //单元格宽
            //     slotName: 'pm10'
            // });
            //#endif
        }
    }
};
</script>

<style lang="less" scoped>
.slot-div {
    div {
        width: 100rpx;
        padding: 6rpx 22rpx;
        margin: auto;
        text-align: center;
        border-radius: 30rpx;
        background-color: green;
        color: #fff;
    }
}
</style>
